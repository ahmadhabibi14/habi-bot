interface TiketRegular {
  type : string,
  no_insiden : string,
  no_speedy  : string,
  nama_pelanggan : string,
  perbaikan : string,
  done : boolean,
  date : Date,
  point : number,
}

interface LaporLangsung {
  type : string,
  id_generate : string,
  no_speedy   : string,
  nama_pelanggan : string,
  cp_pelanggan : string,
  perbaikan : string,
  done : boolean,
  date : Date,
  point : number
}

interface TutupODP{  
  type : string,
  id_generate : string,
  nama_odp : string,
  alamat_odp : string, 
  date : Date,
  done : boolean,
  point : number
}

interface TiketSQM {
  type : string,
  no_insiden : string,
  no_speedy : string,
  nama_pelanggan : string,
  perbaikan : string,
  done: boolean,
  date : Date,
  point : number 
}

interface Proman {
  type : string,
  id_generate : string,
  nama_odp : string,
  distribusi : string,
  kapasitas_port : string,
  status_port_isi : string,
  status_port_kosong : string,
  odp_gendong : string,
  done : boolean,
  hasil_ukur_opm : string,
  date : Date,
  point : number
}

interface Unspect {
  type: string,
  id_generate : string,
  no_speedy : string,
  odp : string,
  done : boolean,
  perbaikan : string,
  date : Date,
  point : number 
}

interface Valins {
  type: string,
  id_valins : string,
  nama_odp : string,
  done : boolean,
  date : Date,
  point : number
}

interface GamasTypeA {
  type: string,
  id_generate : string,
  nama: string,
  keterangan: string,
  date : Date,
  point : number,
  done: boolean
}
interface GamasTypeB {
  type: string,
  id_generate : string,
  nama: string,
  keterangan: string,
  date : Date,
  point : number,
  done : boolean
}
interface GamasTypeC {
  type: string,
  id_generate : string,
  nama: string,
  keterangan: string,
  date : Date,
  point : number,
  done : boolean
}
interface TugasTL {
  type: string,
  id_generate : string,
  nama: string,
  keterangan: string,
  date : Date,
  point : number,
  done : boolean
}


type Task = TiketSQM | LaporLangsung | TutupODP | TiketRegular | Proman | Unspect | Valins | GamasTypeA | GamasTypeB | GamasTypeC | TugasTL
export {
  TiketRegular,
  TutupODP,
  LaporLangsung,
  TiketSQM,
  Proman,
  Unspect,
  Valins,
  GamasTypeA,
  GamasTypeB,
  GamasTypeC,
  TugasTL,
  Task
}
