/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var QUAL_MUL = 30;

function FilterSample_0() {
  this.isPlaying = false;
  loadSounds(this, {buffer: './mp3/all_mix_3.mp3'}, mp3_loaded_check());
};

FilterSample_0.prototype.play = function() {
  // Create the source.
  var source = context.createBufferSource();
  source.buffer = this.buffer;
  // Create the filter.
  var filter = context.createBiquadFilter();
  filter.type = filter.LOWPASS;
  //filter.type = filter.HIGHPASS;
  filter.frequency.value = 5000;
  // Connect source to filter, filter to destination.
  source.connect(filter);
  filter.connect(context.destination);

  var rnd = Math.floor(Math.random()*500)/100;
  source.start(0, rnd);

  source.loop = true;
  // Save source and filterNode for later access.
  this.source = source;
  this.filter = filter;
};

FilterSample_0.prototype.stop = function() {
  this.source.stop(0);
};

FilterSample_0.prototype.toggle = function() {
  this.isPlaying ? this.stop() : this.play();
  this.isPlaying = !this.isPlaying;
};

FilterSample_0.prototype.changeFrequency = function(v) {
  // Clamp the frequency between the minimum value (40 Hz) and half of the
  // sampling rate.
  var minValue = 40;
  var maxValue = context.sampleRate / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var multiplier = Math.pow(2, numberOfOctaves * (v - 1.0));
  // Get back to the frequency value between min and max.
  this.filter.frequency.value = maxValue * multiplier;

  this.filter.Q.value = 1*10;
};
