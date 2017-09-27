class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config === null) {
        throw new Error();
      }else {
        this.state = config;
        this.state.currentState = this.state.initial;
        this.state.history = [this.state.initial];
      }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      let stateArr = Object.keys(this.state.states);
      if (!stateArr.includes(state)) {
        throw new Error();
      }else {
        this.state.currentState = state;
        this.state.history.push(state);
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (!this.state.states[this.state.currentState].transitions[event]) {
        throw new Error();
      }else if (this.state.states[this.state.currentState].transitions[event]) {
        this.state.currentState = this.state.states[this.state.currentState].transitions[event];
        if (this.state.currentState !== this.state.history[this.state.history.length-1]) {
          this.state.history.push(this.state.currentState);
        }
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state.currentState = this.state.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let result = [];
      if (event == null) { 
        return Object.keys(this.state.states);
      }else {
        for (var i = 0; i < Object.keys(this.state.states).length; i++) {
          let verifiable = Object.keys(this.state.states)[i];
          if (Object.keys(this.state.states[verifiable].transitions).includes(event)) {
            result.push(verifiable);
          }
        }
      }
      return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.state.currentState === this.state.history[0]) {
          return false;
      }else if (this.state.history[this.state.history.length-2]) {
          this.state.currentState = this.state.history[this.state.history.length-2];
          return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.state.currentState === this.state.history[this.state.history.length-1]) {
        return false;
      }else if (this.state.history[this.state.history.length-1]) {
        this.state.currentState = this.state.history[this.state.history.length-1];
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.state.history = [this.state.initial];
      this.state.currentState = this.state.initial;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
