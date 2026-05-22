import { supabase } from '@/lib/supabase'

export default async function Home() {

  const { data, error } = await supabase
    .from('products')
    .select('*')

  console.log(data)

  return (
    <div style={{padding:40}}>
      数据库连接成功
    </div>
  )
}