<script src="./learn.js"></script>
<style lang="scss" src="./learn.scss"></style>
<template>
  <div class="round-card">
    <transition name="slide-fade">
      <div class="package-container-outer" v-show="mode === 'package'">
        <div class="package-container">
          <span class="package-header">Select a quote package:</span>
          <div class="package-row">
            <div class="package-item" v-on:click="select('macbeth')" style="background-color: #AAAAAA;">Macbeth</div>
            <div class="package-item" v-on:click="select('ge')">Great Expectations</div>
          </div>
          <div class="package-row">
            <div class="package-item" v-on:click="select('poetry')">Poetry</div>
            <div class="package-item" v-on:click="select('inspector')">An Inspector Calls</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="init-container-outer" v-show="mode === 'init'">
        <div class="init-container">
          <span class="init-header">Select what you'd like to learn:</span>
          <div class="all-container">
            <span class="all-label">All</span>
            <input type="checkbox" class="all-checkbox" v-model="allQuotes">
          </div>
          <div class="init-group-list">
            <div v-for="group in groups">
              <input type="checkbox" :value="group" :disabled="allQuotes" v-model="selectedGroups">
              <span>{{ group }}</span>
            </div>
          </div>
          <div class="button-container">
            <div class="button-next" v-on:click="next">Next</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="test-container-outer" v-show="mode === 'test'">
        <div class="test-container">
          <div class="prompt-container">
            <span class="prompt-header">Quote:</span>
            <span class="prompt-content">{{ prompt }}</span>
            <span class="prompt-info">
              This quote is from {{ round.group }}. ({{ words }})
            </span>
          </div>
          <div class="answer-container">
            <span class="answer-header">Complete the quote:</span>
            <textarea class="answer-box" v-model="round.attempt"></textarea>
          </div>
          <div class="button-container">
            <div class="button-check" v-bind:class="{ answered }" v-on:click="check">
              {{ this.answered ? 'check' : 'skip' }}
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="learn-container-outer" v-show="mode === 'learn'">
        <div class="learn-container">
          <img>
          <div class="quote-container">
            <span class="quote-header">Quote:</span>
            <span class="quote-content">{{ round.text }}</span>
          </div>
          <div class="answer-container">
            <span class="answer-header">Answer:</span>
            <span class="answer-content">
              <span v-for="token in round.tokens" v-bind:class="{ grey: token.removed, red: token.added }">
                {{ token.value.trim() }}
              </span>
            </span>
          </div>
          <div class="retype-container" v-show="!round.correct">
            <span class="retype-header">Type it out:</span>
            <textarea class="retype-box" v-model="round.retype"></textarea>
          </div>
          <div class="button-container">
            <div class="button-next" v-bind:class="{ disabled: !hasRetyped }" v-on:click="next">Next</div>
          </div>
        </div></div>
    </transition>
  </div>
</template>
