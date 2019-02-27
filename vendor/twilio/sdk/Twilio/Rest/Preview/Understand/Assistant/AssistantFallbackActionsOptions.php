<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Rest\Preview\Understand\Assistant;

use Twilio\Options;
use Twilio\Values;

/**
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 */
abstract class AssistantFallbackActionsOptions {
    /**
     * @param array $fallbackActions The fallback_actions
     * @return UpdateAssistantFallbackActionsOptions Options builder
     */
    public static function update($fallbackActions = Values::NONE) {
        return new UpdateAssistantFallbackActionsOptions($fallbackActions);
    }
}

class UpdateAssistantFallbackActionsOptions extends Options {
    /**
     * @param array $fallbackActions The fallback_actions
     */
    public function __construct($fallbackActions = Values::NONE) {
        $this->options['fallbackActions'] = $fallbackActions;
    }

    /**
     * The fallback_actions
     * 
     * @param array $fallbackActions The fallback_actions
     * @return $this Fluent Builder
     */
    public function setFallbackActions($fallbackActions) {
        $this->options['fallbackActions'] = $fallbackActions;
        return $this;
    }

    /**
     * Provide a friendly representation
     * 
     * @return string Machine friendly representation
     */
    public function __toString() {
        $options = array();
        foreach ($this->options as $key => $value) {
            if ($value != Values::NONE) {
                $options[] = "$key=$value";
            }
        }
        return '[Twilio.Preview.Understand.UpdateAssistantFallbackActionsOptions ' . implode(' ', $options) . ']';
    }
}