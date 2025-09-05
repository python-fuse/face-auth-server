require("@tensorflow/tfjs-node");
import * as faceapi from "@vladmandic/face-api";
import canvas, { Canvas, Image, ImageData } from "canvas";

import fs from "fs";

class FaceService {
  private readonly MODEL_URL = "models";
  private modelsLoaded: boolean = false;

  constructor() {
    if (faceapi.env) {
      faceapi.env.monkeyPatch({
        Canvas: Canvas as any,
        Image: Image as any,
        ImageData: ImageData as any,
      });
    }

    this.loadModels();
  }

  private async loadModels() {
    if (this.modelsLoaded) return;

    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk(this.MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromDisk(this.MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromDisk(this.MODEL_URL),
    ]);

    this.modelsLoaded = true;
  }

  async extractFaceData(image: string): Promise<string> {
    const img = (await canvas.loadImage(image)) as canvas.Image;
    const detections = await faceapi
      .detectSingleFace(img as any)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      throw new Error("No face detected");
    }

    return JSON.stringify(detections.descriptor);
  }

  async compareFaces(
    savedDescriptor: string,
    uploadedImage: string
  ): Promise<boolean> {
    const uploadedDescriptor = await this.extractFaceData(uploadedImage);

    const descriptor1 = new Float32Array(
      Object.values(JSON.parse(savedDescriptor))
    );
    const descriptor2 = new Float32Array(
      Object.values(JSON.parse(uploadedDescriptor))
    );

    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);

    console.log("Comparison result: ", distance);

    fs.rmSync(uploadedImage);

    return distance > 0.6 ? false : true;
  }
}

export default new FaceService();
