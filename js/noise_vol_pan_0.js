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

function noise_vol_pan_0() {
  this.isPlaying = false;
  loadSounds(this, {buffer: './mp3/noise_3.mp3'}, mp3_loaded_check);
};

noise_vol_pan_0.prototype.play = function() {
  // Create the source.
  var source = context.createBufferSource();
  source.buffer = this.buffer;

    var panner = context.createPanner();
    panner.panningModel = "equalpower";
    source.connect(panner);
    this.panner = panner;

    var gainNode = context.createGain();
    panner.connect(gainNode);
    gainNode.connect(context.destination);
    this.gainNode = gainNode;


  var rnd = Math.floor(Math.random()*1000)/100;
  source.start(0, rnd);

  source.loop = true;
  this.source = source;
};

noise_vol_pan_0.prototype.stop = function() {
  this.source.stop(0);
};

noise_vol_pan_0.prototype.toggle = function() {
  this.isPlaying ? this.stop() : this.play();
  this.isPlaying = !this.isPlaying;
};

noise_vol_pan_0.prototype.changeVolume = function(v) {
  this.gainNode.gain.value = v;
};
noise_vol_pan_0.prototype.changePan = function(v) {
  this.panner.setPosition(v*0.1, -10*0.1, -10*0.1);
};
