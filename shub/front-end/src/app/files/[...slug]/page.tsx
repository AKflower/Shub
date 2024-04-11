import File from "../file"

export default function Doc({ params }: { params: { slug: string[] } }) {
  console.log(params)

  return (
        <div className="">
            <File />
        </div>
    )
} 