import { Teknisi, TeknisiModel } from "./Model";
import { Task } from "../performansi/Model";
import { broadcast } from "../../telegram/bot";
import {
  addSektor,
  addWitel,
  addReg,
  upSektor,
  upWitel,
  upReg,
} from "../filtered/Service";
//function createSektor(sektoName: string){}

export async function getTeknisi(
  Nik: number,
  IDTelegram?: string
): Promise<Teknisi | null | undefined> {
  if (Nik != 0) {
    let teknisi: Teknisi | null;
    try {
      teknisi = await TeknisiModel.findOne({ NIK: Nik });
    } catch (e) {
      return null;
    }
    return teknisi;
  } else if (IDTelegram) {
    let teknisi: Teknisi | null;
    try {
      teknisi = await TeknisiModel.findOne({ IDTelegram: IDTelegram });
    } catch (e) {
      return null;
    }
    return teknisi;
  }
}
export async function newTeknisi(Data: Teknisi): Promise<boolean> {
  let teknisi = await getTeknisi(Data.NIK);
  if (!teknisi) {
    try {
      let baru = new TeknisiModel(Data);
      baru.save();
      console.log(Data.Sektor);
      await addSektor(Data.Sektor, Data.point);
      await addWitel(Data.Witel, Data.point);
      await addReg(Data.Regional, Data.point);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export async function updateHandle(
  Handle: Task,
  IdT: string
): Promise<null | boolean> {
  let TeknisiOld: any = await getTeknisi(0, IdT);
  if (!TeknisiOld) {
    return null;
  }
  TeknisiOld.Handle.push(Handle);
  let point: number = 0;
  TeknisiOld.Handle.forEach((element: Task) => {
    point += element.point;
  });
  TeknisiOld.point = point;
  delete TeknisiOld._id;
  await upSektor(TeknisiOld.Sektor, TeknisiOld.point, "+");
  await upWitel(TeknisiOld.Witel, TeknisiOld.point, "+");
  await upReg(TeknisiOld.Regional, TeknisiOld.point, "+");

  let Update = await TeknisiModel.findOneAndUpdate(
    { IDTelegram: IdT },
    TeknisiOld
  );
  if (!Update) {
    return null;
  }
  return true;
}

export async function updateUser(
  User: any,
  IdT: string
): Promise<null | boolean> {
  let TeknisiOld = await getTeknisi(0, IdT);
  if (!TeknisiOld) {
    return null;
  }
  delete User._id;
  let Update = await TeknisiModel.findOneAndUpdate({ IDTelegram: IdT }, User);
  if (!Update) {
    return null;
  }
  return true;
}
export async function getAll(): Promise<Teknisi[]> {
  let Teknisies = await TeknisiModel.find({});
  return Teknisies;
}

export async function addLeadTask(obj: {
  idGenerate: string;
  namaTeknisi: string;
  keterangan: string;
  type: string;
  Nik: number;
}): Promise<boolean> {
  let po =
    obj.type == "gamasTypeA"
      ? 2
      : obj.type == "gamasTypeB"
      ? 3
      : obj.type == "gamasTypeC"
      ? 4
      : obj.type == "tugasTl"
      ? 1
      : 0;
  let newTask: Task = {
    type: obj.type,
    id_generate: obj.idGenerate,
    nama: obj.namaTeknisi,
    keterangan: obj.keterangan,
    point: po,
    done: false,
    date: new Date(),
  };
  let teknisi: any;
  try {
    teknisi = await TeknisiModel.findOne({ NIK: obj.Nik });
  } catch (e) {
    console.log(e);
    return false;
  }
  //console.log(teknisi)
  if (!teknisi) {
    return false;
  }
  if (teknisi._id) {
    delete teknisi._id;
  }
  teknisi.Handle.push(newTask);
  broadcast.emit(
    "send",
    Number(teknisi.IDTelegram),
    "kamu mendapatkan tugas baru"
  );
  await updateUser(teknisi, teknisi.IDTelegram);
  return true;
}

//broadcast.emit("send",1276258511,"hi")
//export function updatePoint()
