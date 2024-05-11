import Favourite from "../shared"

export default function Doc({ params }: { params: { slug: string[] } }) {

  return (
        <div className="">
            <Favourite />
        </div>
    )
} 