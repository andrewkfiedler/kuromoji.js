/*
 * Copyright 2014 Takuya Asano
 * Copyright 2010-2014 Atilika Inc. and contributors
 *
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

"use strict";

var fs = require("fs");
var node_zlib = require("zlib");
var DictionaryLoader = require("./DictionaryLoader");

/**
 * NodeDictionaryLoader inherits DictionaryLoader
 * @param {string} dic_path Dictionary path
 * @constructor
 */
function NodeDictionaryLoader(dic_path) {
  DictionaryLoader.apply(this, [dic_path]);
}

function decompress(buffer, callback) {
  console.log("decompress");
  var BASE64_MARKER = ";base64,";
  var base64Index = buffer.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = buffer.substring(base64Index);
  buffer = Buffer.from(base64, "base64");
  var typed_array = new Uint8Array(buffer);
  callback(null, typed_array.buffer);
}

NodeDictionaryLoader.prototype = Object.create(DictionaryLoader.prototype);

/**
 * Utility function
 * @param {string} file Dictionary file path
 * @param {NodeDictionaryLoader~onLoad} callback Callback function
 */
NodeDictionaryLoader.prototype.loadArrayBuffer = function(file, callback) {
  switch (file) {
    case "base.dat.gz":
      require(["./../../dict/base.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "check.dat.gz":
      require(["./../../dict/check.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "tid.dat.gz":
      require(["./../../dict/tid.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "tid_pos.dat.gz":
      require(["./../../dict/tid_pos.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "tid_map.dat.gz":
      require(["./../../dict/tid_map.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "cc.dat.gz":
      require(["./../../dict/cc.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "unk.dat.gz":
      require(["./../../dict/unk.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "unk_pos.dat.gz":
      require(["./../../dict/unk_pos.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "unk_map.dat.gz":
      require(["./../../dict/unk_map.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "unk_char.dat.gz":
      require(["./../../dict/unk_char.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "unk_compat.dat.gz":
      require(["./../../dict/unk_compat.dat"], file => {
        decompress(file, callback);
      });
      break;
    case "unk_invoke.dat.gz":
      require(["./../../dict/unk_invoke.dat"], file => {
        decompress(file, callback);
      });
      break;
    default:
      fs.readFile(file, function(err, buffer) {
        if (err) {
          return callback(err);
        }
        decompress(buffer, callback);
      });
      break;
  }
};

/**
 * @callback NodeDictionaryLoader~onLoad
 * @param {Object} err Error object
 * @param {Uint8Array} buffer Loaded buffer
 */

module.exports = NodeDictionaryLoader;
