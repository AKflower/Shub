import Favourite from "../favorite"

export default function Doc({ params }: { params: { slug: string[] } }) {

  return (
        <div className="">
            <Favourite />
        </div>
    )
} 