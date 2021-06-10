'use strict';

// Firebase setup
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Node.js core modules
const fs = require('fs');
const mkdirp = fs.promises.mkdir;
const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');
const os = require('os');

// Vision Api
const vision = require('@google-cloud/vision');

// The folder where images which need to be confirmed will be saved.
const CONFIRMATION_FOLDER = 'confirmation';

/**
 *  Check offensive images
 *  If safeSearchAnnotation result is "Likely" or "Very Likely", 
 *  judgging that the iamge is unsafe and traisiting images to CONFIRMATION_FOLDER.
 */
exports.checkOffensiveContent = functions.storage.object().onFinalize(async (object) => {
    // Check the image content using the Cloud Vision Api
    const visionClient = new vision.ImageAnnotatorClient();
    const data = await visionClient.safeSearchDetection(
        `gs://${object.bucket}/${object.name}`
    );
    const safeSearchResult = data[0].safeSearchAnnotation;

    if(
        safeSearchResult.adult === 'VERY_LIKELY' ||
        safeSearchResult.adult === 'LIKELY' ||
        safeSearchResult.spoof === 'VERY_LIKELY' ||
        safeSearchResult.spoof === 'LIKELY' ||
        safeSearchResult.medical === 'VERY_LIKELY' ||
        safeSearchResult.medical === 'LIKELY' ||
        safeSearchResult.violence === 'VERY_LIKELY' ||
        safeSearchResult.violence === 'LIKELY' ||
        safeSearchResult.racy === 'VERY_LIKELY' ||
        safeSearchResult.racy === 'LIKELY'
    ) {
        functions.logger.log('Offensive image found.');
    }

    return null;
});


/**
 *  Check person in images
 *  If localizedObjectAnnotations result is Person with over 80%,
 *  judgging that the iamge contains person and traisiting images to CONFIRMATION_FOLDER.
 */
 exports.checkPerson = functions.storage.object().onFinalize(async (object) => {
    // Check the image content using the Cloud Vision Api
    const visionClient = new vision.ImageAnnotatorClient();
    const [data] = await visionClient.objectLocalization(
        `gs://${object.bucket}/${object.name}`
    );
    const checkPersonResult = data.localizedObjectAnnotations;

    checkPersonResult.forEach(result => {
        functions.logger.log(result.name);
        if(result.name === 'Person') {
            functions.logger.log('Person found.');
        }
    });


    return null;
});


/**
 *  Check advertising in images
 *  If localizedObjectAnnotations result is Person with over 80%,
 *  judgging that the iamge contains person and traisiting images to CONFIRMATION_FOLDER.
 */
 exports.checkAdvertising = functions.storage.object().onFinalize(async (object) => {
    // Check the image content using the Cloud Vision Api
    const visionClient = new vision.ImageAnnotatorClient();
    const [data] = await visionClient.documentTextDetection(
        `gs://${object.bucket}/${object.name}`
    );
    const checkAdvertisingResult = data.fullTextAnnotation;
    functions.logger.log(`documentTextDetection results on image "${object.name}"`, checkAdvertisingResult);

    if(checkAdvertisingResult !== null) {
        functions.logger.log('Advertising foung');
    }

    return null;
});