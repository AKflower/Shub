import Favourite from "../favorite"

export default function Doc({ params }: { params: { slug: string[] } }) {
  console.log(params)

  return (
        <div className="">
            <Favourite />
        </div>
    )
} 