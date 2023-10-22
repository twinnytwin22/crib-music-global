'use client'
function page({params}: {params: { id: string | number }}) {
const {id} = params
  return (
    <div>Id:{id}</div>
  )
}

export default page