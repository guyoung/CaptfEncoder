<template>
  <v-col cols="12" :md="field.cols || 3">
    <template v-if="field.type == 'text'">
      <v-text-field
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        v-on:input="onInput"
      ></v-text-field>
      <button v-if="field.button" @click="setVal(field.button.func)">
        {{
          typeof field.button.text === 'function'
            ? field.button.text()
            : field.button.text
        }}
      </button>
    </template>

    <template v-else-if="field.type == 'number'">
      <v-text-field
        type="number"
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        v-on:input="onInput"
      ></v-text-field>
    </template>

    <template v-else-if="field.type == 'textarea'">
      <v-textarea
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        rows="3"
        v-on:input="onInput"
      ></v-textarea>
      <button v-if="field.button" @click="setVal(field.button.func)">
        {{
          typeof field.button.text === 'function'
            ? field.button.text()
            : field.button.text
        }}
      </button>
    </template>

    <template v-else-if="field.type == 'email'">
      <v-text-field
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :rules="validationRules.email"
        v-on:input="onInput"
      ></v-text-field>
    </template>

    <template v-else-if="field.type == 'password'">
      <v-text-field
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        :append-icon="field.passwordVisible ? 'visibility_off' : 'visibility'"
        :append-icon-cb="appendPasswordIconCheckbox()"
        :type="field.passwordVisible ? 'text' : 'password'"
        v-on:input="onInput"
      ></v-text-field>
    </template>

    <template v-else-if="field.type == 'select'">
      <v-select
        v-model="localValue"
        :items="field.items"
        item-value="value"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        v-on:change="onChange"
      >
        <template v-slot:selection="{ item }">
         {{typeof item.text === 'function'? item.text(): item.text}}
        </template>
        <template v-slot:item="{ item, on, attrs}" >
          <v-list-item v-on="on" v-bind="attrs">
            <v-list-item-content>
              <v-list-item-title> {{typeof item.text === 'function'? item.text(): item.text}} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>
    </template>

    <template v-else-if="field.type == 'checkbox'">
      <v-checkbox
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        v-on:change="onChange"
      ></v-checkbox>
    </template>

    <template cols="12" sm="3" v-else>
      <v-text-field
        v-model="localValue"
        :label="typeof field.label === 'function' ? field.label() : field.label"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        :placeholder="field.placeholder"
        v-on:input="onInput"
      ></v-text-field>
      <button v-if="field.button" @click="setVal(field.button.func)">
        {{
          typeof field.button.text === 'function'
            ? field.button.text()
            : field.button.text
        }}
      </button>
    </template>
  </v-col>
</template>

<script>
export default {
  name: "ext-form-field",
  props: {
    field: Object,
    value: null,
  },
  data() {
    return {
      localValue: this.value,

      validationRules: {
        email: [
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            this.validationErrorMessages.emailInvalid,
        ],
      },

      validationErrorMessages: {
        emailInvalid: "E-mail must be valid",
      },
    };
  },

  created: function () {},

  methods: {
    onChange: function () {
      this.$emit("input", this.localValue);
    },

    onInput: function () {
      this.$emit("input", this.localValue);
    },

    appendPasswordIconCheckbox() {
      return () => (this.field.passwordVisible = !this.field.passwordVisible);
    },

    setVal(func) {
      this.localValue = func();

      this.$emit("input", this.localValue);
    },
  },
};
</script>