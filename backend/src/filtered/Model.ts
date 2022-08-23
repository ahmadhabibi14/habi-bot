import * as mongo from "mongoose";
interface sektor {
  rata_rata: number;
  name: string;
  jumblah: number;
}
interface witel {
  rata_rata: number;
  name: string;
  jumblah: number;
}
interface regional {
  rata_rata: number;
  name: string;
  jumblah: number;
}

const sektorSchema = new mongo.Schema<sektor>({
  rata_rata: { type: Number, required: true },
  name: { type: String, required: true },
  jumblah: { type: Number, required: true },
});
const sektorModel = mongo.model<sektor>("sektor", sektorSchema);

const witelSchema = new mongo.Schema<witel>({
  rata_rata: { type: Number, required: true },
  name: { type: String, required: true },
  jumblah: { type: Number, required: true },
});
const witelModel = mongo.model<witel>("witel", witelSchema);

const regionalSchema = new mongo.Schema<regional>({
  rata_rata: { type: Number, required: true },
  name: { type: String, required: true },
  jumblah: { type: Number, required: true },
});
const regionalModel = mongo.model<regional>("regional", regionalSchema);

export { sektor, witel, regional, sektorModel, witelModel, regionalModel };
