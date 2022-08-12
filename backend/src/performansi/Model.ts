interface TiketRegular {
  type : string,
  no_insiden : string,
  no_speedy  : string,
  nama_pelanggan : string,
  perbaikan : string,
  point : number
}

interface LaporLangsung {
  type : string,
  id_generate : string,
  no_speedy   : string,
  nama_pelanggan : string,
  cp_pelanggan : string,
  perbaikan : string,
  point : number
}

interface TutupODP{  
  type : string,
  id_generate : string,
  nama_odp : string,
  alamat_odp : string, 
  point : number
}

interface TiketSQM {
  type : string,
  no_insiden : string,
  no_speedy : string,
  nama_pelanggan : string,
  perbaikan : string,
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
  hasil_ukur_opm : string,
  point : number
}

interface Unspect {
  name: string,
  id_generate : string,
  no_speedy : string,
  odp : string,
  perbaikan : string,
  point : number 
}

interface Valins {
  name: string,
  id_valins : string,
  nama_odp : string,
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
