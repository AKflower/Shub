import Favourite from "../trash"

export default function Doc({ params }: { params: { slug: string[] } }) {
  console.log(params)

  return (
        <div className="">
            <Favourite />
        </div>
    )
} 