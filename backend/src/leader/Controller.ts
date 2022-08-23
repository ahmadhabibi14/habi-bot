import { Response, Request } from "express";
import Service from "./Service";
import jwt from "jsonwebtoken";
import {
  getTeknisi,
  newTeknisi,
  addLeadTask,
  getAll,
} from "../teknisi/Service";
import { getSektor, getWitel, getReg } from "../filtered/Service";
// LOGIN
export async function getLeader(req: Request, res: Response) {
  const leaderProp = req.body;
  let Leader = await Service.getLeaderByNik(leaderProp.NIK);
  if (!Leader) {
    res.status(404).json({ msg: "leader not found" });
    return;
  }

  const password = leaderProp.password;
  if (typeof Leader != "string") {
    if (!Service.validatedPass(leaderProp.password, Leader.Password)) {
      res.status(400).json({ msg: "password wrong" });
      return;
    }
  }
  let jwtNik = Service.jwtNik(leaderProp.NIK);
  res.cookie("token", jwtNik, { httpOnly: true, maxAge: 9000000 });
  //res.cookie("token",jwtNik,{maxAge: 9000000,path:"/leader/login",sameSite: "none",secure: true})

  if (typeof Leader != "string") {
    let toSend = {
      NIK: Leader.NIK,
      Nama: Leader.Nama,
      IDTelegram: Leader.IDTelegram,
      NamaMitra: Leader.NamaMitra,
      Sektor: Leader.Sektor,
      Witel: Leader.Witel,
      Regional: Leader.Regional,
    };
    res.json(toSend);
    return;
  }
}
//LOGIN DIRECT
export async function loginWithToken(req: Request, res: Response) {
  if (!req.headers.cookie) {
    res.status(404).json({ msg: "must be login first" });
    return;
  }
  let k: any;
  if (
    req.headers &&
    req.headers.cookie &&
    typeof req.headers.cookie == "string"
  ) {
    k = jwt.verify(req.headers.cookie.split("token=")[1], "xdxrc");
  }
  let nik = 0;
  if (typeof k != "string") {
    nik = k.data;
  }

  let Leader = await Service.getLeaderByNik(nik);
  if (!Leader) {
    res.status(404).json({ msg: "leader not found" });
    return;
  }
  if (typeof Leader != "string") {
    let toSend = {
      NIK: Leader.NIK,
      Nama: Leader.Nama,
      IDTelegram: Leader.IDTelegram,
      NamaMitra: Leader.NamaMitra,
      Sektor: Leader.Sektor,
      Witel: Leader.Witel,
      Regional: Leader.Regional,
    };
    res.json(toSend);
    return;
  }
}
// SIGNUP
export async function createLeader(req: Request, res: Response) {
  const {
    NIK,
    Nama,
    IDTelegram,
    NamaMitra,
    Sektor,
    Witel,
    Regional,
    Password,
    ConfirmPassword,
  } = req.body;
  console.log(req.body);
  if (ConfirmPassword != Password) {
    res.status(400).json({ msg: "password not match" });
    return;
  }
  const hashedPassword = Service.hashingPassword(Password);
  // valide nik not duplicate
  if (!(await Service.checkNik(NIK))) {
    res.status(400).json({ msg: "nik has usage" });
    return;
  }
  // valide leader has add
  if (
    !Service.newLeader(
      NIK,
      Nama,
      IDTelegram,
      NamaMitra,
      Sektor,
      Witel,
      Regional,
      hashedPassword
    )
  ) {
    res.status(500).json({ msg: "something went wrong" });
    return;
  }

  res.json({ msg: "you has added" });
}

// LOGOUT
export async function logout(req: Request, res: Response) {
  if (!req.headers.cookie) {
    res.status(404).json({ msg: "must be login first" });
    return;
  }
  res.clearCookie("token");
  res.json({ msg: "logout succes" });
}

// Middleware
export async function isLoginAndLeader(
  req: Request,
  res: Response,
  next: () => void
) {
  console.log(req.headers);
  if (!req.headers.cookie) {
    res.status(400).json({ msg: "must be login first" });
    return;
  }
  let k: any;
  if (
    req.headers &&
    req.headers.cookie &&
    typeof req.headers.cookie == "string"
  ) {
    try {
      k = jwt.verify(req.headers.cookie.split("token=")[1], "xdxrc");
    } catch {
      res.sendStatus(500);
      return;
    }
  }
  let nik = 0;
  if (typeof k != "string") {
    nik = k.data;
  }

  let Leader = await Service.getLeaderByNik(nik);
  if (!Leader) {
    res.status(404).json({ msg: "leader not found" });
    return;
  }
  next();
}
// Create Teknisi
export async function createTeknisi(req: Request, res: Response) {
  const TeknisiData = req.body;
  let succes = await newTeknisi(TeknisiData);
  if (succes) {
    res.json({ msg: "teknisi has added" });
    return;
  }
  res.status(400).json({ msg: "cannot added teknisi" });
}
export async function getTeknisiData(req: Request, res: Response) {
  const { NIK } = req.body;
  try {
    let Data = await getTeknisi(NIK);
    if (!Data) {
      return res.status(404).json({ msg: "teknisi not defined" });
    }
    res.json(Data);
    return;
  } catch (e) {
    res.sendStatus(500);
    return;
  }
}

export async function getTeknisiTen(req: Request, res: Response) {
  const { from, to } = req.body;
  //console.log(req.body)
  const teknisi = await getAll();
  const nameOnly = teknisi.map((e) => {
    return { Nama: e.Nama, NIK: e.NIK };
  });
  if (!to) {
    res.json(nameOnly);
    return;
  }
  res.json(teknisi.slice(from, to));
}

export async function addTask(req: Request, res: Response) {
  let succes = await addLeadTask(req.body);
  if (succes) {
    res.json({ msg: "succesfull set task" });
    return;
  }
  res.status(500).json({ msg: "error set task" });
}

export async function getSektorC(req: Request, res: Response) {
  let data = await getSektor();
  if (!data) {
    res.sendStatus(404);
    return;
  }
  res.json(data);
}
export async function getWitelC(req: Request, res: Response) {
  let data = await getWitel();
  if (!data) {
    res.sendStatus(404);
    return;
  }
  res.json(data);
}
export async function getRegC(req: Request, res: Response) {
  let data = await getReg();
  if (!data) {
    res.sendStatus(404);
    return;
  }
  res.json(data);
}
