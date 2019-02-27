$(function () {
  var speakerDevices = document.getElementById('speaker-devices');
  var ringtoneDevices = document.getElementById('ringtone-devices');
  var outputVolumeBar = document.getElementById('output-volume');
  var inputVolumeBar = document.getElementById('input-volume');
  var volumeIndicators = document.getElementById('volume-indicators');

  var device;

  log('Requesting Capability Token...');
  $.getJSON('token.php',{client:client})
  .then(function (data) {
    log('Got a token.');
    console.log('Token: ' + data.token);

      // Setup Twilio.Device
      device = new Twilio.Device(data.token);
      var worker = new Twilio.TaskRouter.Worker(data.token_router);

      device.on('ready',function (device) {
        log('Twilio.Device Ready!');
        document.getElementById('call-controls').style.display = 'block';
        document.getElementById('button-mute').style.display = 'none';
      });



      device.on('error', function (error) {
        log('Twilio.Device Error: ' + error.message);
      });



      device.on('connect', function (conn) {
        log('Successfully established call!');
        document.getElementById('button-call').style.display = 'none';
        document.getElementById('button-hangup').style.display = 'inline';
        document.getElementById('button-mute').style.display = 'inline';
        volumeIndicators.style.display = 'block';
        bindVolumeIndicators(conn);
        active_connection = conn;
      });



      device.on('disconnect', function (conn) {
        log('Call ended.');
        document.getElementById('button-call').style.display = 'inline';
        document.getElementById('button-hangup').style.display = 'none';
        document.getElementById('button-mute').style.display = 'none';
        volumeIndicators.style.display = 'none';
      });



      device.on('incoming', function (conn) {

        var From=conn.parameters.From;
        if(isNaN(From)){

         $( "#dialog-confirm" ).dialog({
          resizable: false,
          height: "auto",
          width: 400,
          modal: true,
          title:" calling",
          buttons: {
            "Accept": function() {
             conn.accept();
             $( this ).dialog( "close" );

           },
           Reject: function() {
            conn.reject();
            $( this ).dialog( "close" );
          }
        }
      });

       }else{
        conn.accept();


      }



    });




      device.on('cancel', function (conn) {

        $( "#dialog-confirm" ).dialog( "close")

      });




      setClientNameUI(data.client);



      device.audio.on('deviceChange', updateAllDevices.bind(device));

      // Show audio selection UI if it is supported by the browser.
      if (device.audio.isOutputSelectionSupported) {
        document.getElementById('output-selection').style.display = 'block';
      }



      worker.on("ready", function(worker) {
        console.log(worker.sid)             // 'WKxxx'
        console.log(worker.friendlyName)    // 'Worker 1'
        console.log(worker.activityName)    // 'Reserved'
        console.log(worker.available)       // false
        var activityStatus=worker.activityName;
        var activity=worker.available;
        showActivity(activityStatus,activity);
      });



      worker.on("activity.update", function(worker) {
       console.log(worker.sid)             // 'WKxxx'
       console.log(worker.friendlyName)   // 'Worker 1'
       console.log(worker.activityName)   // 'Reserved'
       console.log(worker.available) 
       var activityStatus=worker.activityName;
       var activity=worker.available;
        showActivity(activityStatus,activity);      // false
      });




      $('body').on('click','#activity',function(e){

        e.preventDefault();
        var $this=$(this),
        text=$this.text();

        if(text=='Go offline'){
          $this.text('Go online')
          var props = {"ActivitySid":"WA4b8543417bf9c3e3bc8b5403706a4761"};

        }else{
          $this.text('Go offline')
          var props = {"ActivitySid":"WAbabeb89e5bd623e32d469d94c9ff8415"};
        }

        worker.update(props, function(error, worker) {
          if(error) {
            console.log(error.code);
            console.log(error.message);
          } else {
            console.log(worker.activityName);
           }
         });

      });



      worker.on("reservation.created", function(reservation) {
       console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
       console.log(reservation.task.priority)        // 1
       console.log(reservation.task.age)             // 300
       console.log(reservation.task.sid)             // WTxxx
       console.log(reservation.sid)

       var taskSid=reservation.task.sid;
       $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        title:" calling",
        buttons: {
          "Accept": function() {
            reservation.dequeue("","","","30",
              "https://44976c15.ngrok.io/twilio_test/assignment_status.php?taskSid="+taskSid,"");

            $( this ).dialog( "close" );

          },
          Reject: function() {
           reservation.reject();
           $( this ).dialog( "close" );
         }
       }
     });
                  // WRxxx
                });



      worker.on("reservation.rescinded", function(worker) {

        $( "#dialog-confirm" ).dialog( "close" );
      });



    })
.catch(function (err) {
  console.log(err);
  log('Could not get a token from server!');
});

  // Bind button to make call
  document.getElementById('button-call').onclick = function () {
    // get the phone number to connect the call to
    var params = {
      To: document.getElementById('phone-number').value,
      From: 'client:'+client

    };

    console.log('Calling ' + params.To + '...' + params.From);
    if (device) {
      device.connect(params);
    }
  };

  // Bind button to hangup call
  document.getElementById('button-hangup').onclick = function () {
    log('Hanging up...');
    if (device) {
      device.disconnectAll();
    }
  };





  $('body').on('click','#button-mute',function(e){

    e.preventDefault();
    var $this=$(this),
    text=$this.text();
    if(active_connection){
      if(text=='Mute'){
        active_connection.mute(true);
        $this.text("Unmute");

      }else{
        active_connection.mute(false);
        $this.text("Mute");

      }
    }
  });



  document.getElementById('get-devices').onclick = function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(updateAllDevices.bind(device));
  }

  speakerDevices.addEventListener('change', function() {
    var selectedDevices = [].slice.call(speakerDevices.children)
    .filter(function(node) { return node.selected; })
    .map(function(node) { return node.getAttribute('data-id'); });

    device.audio.speakerDevices.set(selectedDevices);
  });

  ringtoneDevices.addEventListener('change', function() {
    var selectedDevices = [].slice.call(ringtoneDevices.children)
    .filter(function(node) { return node.selected; })
    .map(function(node) { return node.getAttribute('data-id'); });

    device.audio.ringtoneDevices.set(selectedDevices);
  });

  function showActivity(activityStatus,activity){

    var div = document.getElementById('activity status');
    div.innerHTML = 'Your Activity: <strong>' + activityStatus +
    '</strong>';
    if(activityStatus=="Unavailable" || activityStatus=="Offline"){

     $('#activity').text("Go online")

   }else if(activityStatus=="Available" ){

     $('#activity').text("Go offline") 

   }else{

     $('#activity').text("Busy")

   }

 }


 function bindVolumeIndicators(connection) {
  connection.on('volume', function(inputVolume, outputVolume) {
    var inputColor = 'red';
    if (inputVolume < .50) {
      inputColor = 'green';
    } else if (inputVolume < .75) {
      inputColor = 'yellow';
    }

    inputVolumeBar.style.width = Math.floor(inputVolume * 300) + 'px';
    inputVolumeBar.style.background = inputColor;

    var outputColor = 'red';
    if (outputVolume < .50) {
      outputColor = 'green';
    } else if (outputVolume < .75) {
      outputColor = 'yellow';
    }

    outputVolumeBar.style.width = Math.floor(outputVolume * 300) + 'px';
    outputVolumeBar.style.background = outputColor;
  });
}

function updateAllDevices() {
  updateDevices(speakerDevices, device.audio.speakerDevices.get());
  updateDevices(ringtoneDevices, device.audio.ringtoneDevices.get());


    // updateDevices(speakerDevices, );
    // updateDevices(ringtoneDevices, device);
  }




  // Update the available ringtone and speaker devices
  function updateDevices(selectEl, selectedDevices) {
    selectEl.innerHTML = '';

    device.audio.availableOutputDevices.forEach(function(device, id) {
      var isActive = (selectedDevices.size === 0 && id === 'default');
      selectedDevices.forEach(function(device) {
        if (device.deviceId === id) { isActive = true; }
      });

      var option = document.createElement('option');
      option.label = device.label;
      option.setAttribute('data-id', id);
      if (isActive) {
        option.setAttribute('selected', 'selected');
      }
      selectEl.appendChild(option);
    });
  }



  // Activity log
  function log(message) {
    var logDiv = document.getElementById('log');
    logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
    logDiv.scrollTop = logDiv.scrollHeight;
  }



  // Set the client name in the UI
  function setClientNameUI(clientName) {
    var div = document.getElementById('client-name');
    div.innerHTML = 'Your client name: <strong>' + clientName +
    '</strong>';
  }
});