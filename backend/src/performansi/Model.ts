interface TiketRegular {
  type : string,
  no_insiden : string,
  no_speedy  : string,
  nama_pelanggan : string,
  perbaikan : string,
  done : boolean,
  date : Date,
  point : number
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
type Task = TiketSQM | LaporLangsung | TutupODP | TiketRegular | Proman | Unspect | Valins
export {
  TiketRegular,
  TutupODP,
  LaporLangsung,
  TiketSQM,
  Proman,
  Unspect,
  Valins,
  Task
}
