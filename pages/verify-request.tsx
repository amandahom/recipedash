// import { GetServerSideProps } from 'next'

export default function VerifyRequest() {
  return (
    <header className="bg-center bg-fixed bg-no-repeat bg-cover h-screen">
      <style jsx>{`
        header {
          background-image: url(https://res.cloudinary.com/cub95/image/upload/v1624155997/RecipeDash/joanna-kosinska-mjC9apK53a8-unsplash_1_ar7lhh.jpg);
        }
      `}</style>
      <div className="h-screen flex items-center justify-center">
        <div className="mx-2 text-center p-10">
          <h1 className="text-black text-3xl md:text-4xl">To sign in, please check your email.</h1>
          <h2 className="text-black text-md md:text-lg leading-tight py-4">
            A sign in link has been sent to your email address.
          </h2>
        </div>
      </div>
    </header>
  )
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   let token = context
//   console.log(token)
//   return {
//     props: { token: context },
//   }
// }
