import Layout from 'assets/components/Layout'
// import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import Loading from 'utils/Loading'

interface userInterface {
  id: string
  email: string
  firstName?: string
  lastName?: string
  photo?: string
}

function Profile() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [profileLoad, setProfileLoad] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  // const [photo, setPhoto] = useState('')
  const [user, setUser] = useState<userInterface>()
  // const profileRef = useRef<HTMLInputElement>(null)

  async function getUser() {
    try {
      const res = await fetch('/api/user/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const items = await res.json()
      let user: userInterface = {
        id: items._id,
        email: items.email,
        firstName: items.firstName,
        lastName: items.lastName,
        photo: items.photo,
      }

      setUser(user)
      return
    } catch (err) {
      console.log(err)
    }
  }

  async function onSubmit(e: any) {
    e.preventDefault()
    setProfileLoad(true)
    let firstName: string =
      e && e.currentTarget && e.currentTarget.first_name && e.currentTarget.first_name.value
        ? e.currentTarget.first_name.value
        : ''
    let lastName: string = e && e.currentTarget && e.currentTarget.last_name && e.currentTarget.last_name.value
    let email: string = e && e.currentTarget && e.currentTarget.email && e.currentTarget.email.value
    try {
      const res = await fetch('/api/user/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      let userId: string = data._id
      // let file: string = (await uploadDetails()) || ''

      createPost(firstName, lastName, email, userId)
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  // const uploadDetails = async () => {
  //   let uploadedPhoto: File | string =
  //     profileRef && profileRef.current && profileRef.current.files && profileRef.current.files[0]
  //       ? profileRef.current.files[0]
  //       : 'https://res.cloudinary.com/cub95/image/upload/v1623556989/RecipeDash/profile_g9e0tv.png'

  //   try {
  //     if (uploadedPhoto !== 'https://res.cloudinary.com/cub95/image/upload/v1623556989/RecipeDash/profile_g9e0tv.png') {
  //       const data = new FormData()
  //       data.append('file', uploadedPhoto)
  //       data.append('upload_preset', 'recipedash')
  //       data.append('cloud_name', 'cub95')
  //       let items = await fetch('https://api.cloudinary.com/v1_1/cub95/upload', {
  //         method: 'POST',
  //         body: data,
  //       }).then(items => items.json())
  //       let cloudinaryFile: string = items.secure_url
  //       setPhoto(cloudinaryFile)
  //       return cloudinaryFile
  //     } else {
  //       let cloudinaryFile = uploadedPhoto
  //       return cloudinaryFile
  //     }
  //   } catch (err) {
  //     setFailure(true)
  //     console.log(err)
  //   }
  // }

  const createPost = async (firstName: string, lastName: string, email: string, userId: string) => {
    try {
      const body = {
        _id: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        updatedAt: new Date(),
      }

      await fetch('/api/user/updateUser', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      setSuccess(true)
      setProfileLoad(false)
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  useEffect(() => {
    async function getProfile() {
      await getUser()
      setIsLoaded(true)
    }
    getProfile()
  }, [])

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  } else {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:mt-0">
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-0">
                    <h3 className="text-xl sm:text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-md sm:text-sm text-gray-600">
                      This information will be displayed publicly.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form className="" onSubmit={onSubmit}>
                    <div className="shadow overflow-hidden rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              id="first_name"
                              required
                              defaultValue={user && user.firstName}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              id="last_name"
                              defaultValue={user && user.lastName}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email"
                              id="email"
                              autoComplete="email"
                              defaultValue={user && user.email}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          {/* <div className="col-span-6 sm:col-span-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Upload Profile Image<label className="text-blue-500">&nbsp;&nbsp;Optional*</label>
                            </label>
                            <div className="mt-1">
                              <input type="file" name="photo" className="" ref={profileRef} />
                            </div>
                            {photo && <img className="h-40 w-40 my-4 p-2 bg-gray-300" src={photo} />}
                          </div> */}
                        </div>
                      </div>
                      {success && (
                        <div className="block text-md text-indigo-600 text-center pb-2">Profile was updated!</div>
                      )}
                      {failure && (
                        <div className="block text-md text-indigo-600 text-center">
                          Your profile was not successfully updated. 😞&nbsp;&nbsp;Please try again.
                        </div>
                      )}
                      {profileLoad && (
                        <div className="max-w-screen-lg mx-auto flex h-40 w-40 pl-10 p-2">
                          <Loading />
                        </div>
                      )}
                      <div className="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="block" aria-hidden="true">
                <div className="pt-10 sm:py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-0">
                      <h3 className="text-xl sm:text-lg font-medium leading-6 text-gray-900">Settings</h3>
                      <p className="mt-1 text-md sm:text-sm text-gray-600">
                        Request to delete your account and personal information.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="shadow overflow-hidden rounded-md">
                      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <fieldset>
                          <legend className="text-base font-medium text-gray-900">
                            Delete Account & Personal Information
                          </legend>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5"></div>
                              <div className="text-sm">
                                <p className="font-medium text-gray-700">
                                  To delete your information, please send an email to Mandy at:
                                </p>
                                <p className="text-gray-500">
                                  <a
                                    className="text-indigo-600 hover:text-indigo-400 cursor-pointer"
                                    href="amandakhom@gmail.com"
                                  >
                                    amandakhom@gmail.com
                                  </a>
                                </p>
                                <p className="font-small text-gray-600 py-4">
                                  Make sure to include your account's email address in the email.
                                </p>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-10"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Profile
