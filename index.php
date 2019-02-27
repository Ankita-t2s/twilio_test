
<!DOCTYPE html>
<html>
<head>
  <title>Twilio Client Quickstart</title>
   <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
  <link rel="stylesheet" href="site.css">
</head>
<body>
  <div id="controls">
    <div id="info">
      <p class="instructions">Twilio Client</p>
      <div>
      <div id="client-name"></div>
        
        <button id="activity"></button>
      </div>
      <div id="output-selection">
        <label id="activity status"></label>
        <label>Ringtone Devices</label>
        <select id="ringtone-devices" multiple></select>
        <label>Speaker Devices</label>
        <select id="speaker-devices" multiple></select><br/>
        <a id="get-devices">Seeing unknown devices?</a>
      </div>
    </div>
    <div id="call-controls">
      <p class="instructions">Make a Call:</p>
      <input id="phone-number" type="text" placeholder="Enter a phone # or client name" />
      <button id="button-call">Call</button>
      <button id="button-hangup">Hangup</button>
      <button id="button-mute" value="">Mute</button>
      <div id="volume-indicators">
        <label>Mic Volume</label>
        <div id="input-volume"></div><br/><br/>
        <label>Speaker Volume</label>
        <div id="output-volume"></div>
      </div>
    </div>
    <div id="dialog-confirm" title="">
    </div>
    <div id="log"></div>
  </div>

  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script type="text/javascript" src="https://media.twiliocdn.com/sdk/js/client/v1.6/twilio.min.js"></script>
  <script type="text/javascript" src="//media.twiliocdn.com/taskrouter/js/v1.14/taskrouter.min.js"></script>
  <script type="text/javascript" src="quickstart.js"></script>
  <script type="text/javascript">
    window.active_connection;
    window.client = "<?=$_GET['client']?>";
  </script>
</body>
</html>
