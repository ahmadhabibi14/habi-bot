let submitData: any 

export function SubmitData(value: any){
  submitData = value
}

export function saveRecord(): boolean{
  if(!submitData){
    return false
  }
  return true
}
export function discardRecord(): boolean{
  if(!submitData){
    return false
  }
  submitData = ""
  return true
}
