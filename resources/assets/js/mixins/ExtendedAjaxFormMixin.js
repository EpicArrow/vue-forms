/**
 *  Ajax Form Mixin for ajax forms, which have inputs and a submit button as part of their content.
 */

import ajaxFormMixin from "./AjaxFormMixin";
import removeElementMixin from "./RemoveElementMixin";

export default {

    mixins: [ajaxFormMixin, removeElementMixin],

    props: {

        // Set to true, if the form's inputs shall be cleared after the submit.
        clear: {
            type: Boolean,
            default: false
        },

        // Set to true, if the form's inputs shall be reset after the submit.
        reset: {
            type: Boolean,
            default: false
        }
    },

    methods: {

        /**
         * Will be called if the form has been successfully submitted.
         *
         * @param response The response from the server.
         */
        onSuccess: function (response) {

            // Clear the form inputs
            if (this.clear) {
                this.clearInputs();
            }

            // Reset the form inputs
            if (this.reset) {
                this.resetInputs();
            }

            this.removeElement();
        },

        /**
         * Will be called if an error occurred on the form submit.
         *
         * @param errors The errors from the server.
         */
        onError: function (errors) {
            for (let errorKey in errors) {
                if (errors.hasOwnProperty(errorKey)) {
                    this.addErrorToInputComponent(this.getChildInputComponentByName(errorKey), errors[errorKey][0])
                }
            }
        },

        /**
         * Adds the specified error message to the input field of the specified input component.
         *
         * @param inputComponent
         * @param errorMsg
         */
        addErrorToInputComponent: function (inputComponent, errorMsg) {
            if (inputComponent && isFunction(inputComponent.addError)) {
                inputComponent.addError(errorMsg);
            }
        },

        /**
         * Clears the values of the child input component's.
         */
        clearInputs: function () {
            let children = getListOfChildren(this);
            for (let index in children) {
                let child = children[index];
                if (isFunction(child.clear)) {
                    child.clear();
                }
            }
        },

        /**
         * Resets the values of the child input component's.
         */
        resetInputs: function () {
            let children = getListOfChildren(this);
            for (let index in children) {
                let child = children[index];
                if (isFunction(child.reset)) {
                    child.reset();
                }
            }
        },

        /**
         * Gets the child input component of the form, that has an input with the specified name, if it exists.
         *
         * @param inputName
         * @returns {*}
         */
        getChildInputComponentByName: function (inputName) {
            let children = getListOfChildren(this);
            for (let index in children) {
                let child = children[index];
                if (child.name !== undefined && child.name === inputName) {
                    return child;
                }
            }

            return null;
        },
    }
};

