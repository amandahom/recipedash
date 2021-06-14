import emailjs from 'emailjs-com'
import React, { useState } from 'react'

function Disable() {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  async function sendEmail(e: React.FormEvent) {
    e.preventDefault()
    let targetString: any = e && e.target ? e.target : ''
    try {
      await emailjs.sendForm('gmail', 'template_u0m5r0d', targetString, 'user_9dgrx2ZMvNq5wKYntn2af').then()
      setSuccess(true)
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
    // @ts-ignore
    e.target.reset()
  }
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Settings</h3>
              <p className="mt-1 text-sm text-gray-600">Request to delete your account and personal information.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="" onSubmit={sendEmail}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">Delete Personal Information</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">
                            Yes, please.
                          </label>
                          <p className="text-gray-500">Notify Mandy to delete my personal information</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
            {success && <div className="text-sm text-indigo-600 text-center">Request was sent!</div>}
            {failure && (
              <div className="text-sm text-indigo-600 text-center">
                Request was not sent. Please try again or email Mandy at{' '}
                <a href="amandakhom@gmail.com">amandakhom@gmail.com</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disable
