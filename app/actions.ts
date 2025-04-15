'use server'

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email') as string
  
  // TODO: Add your email storage logic here
  console.log('New waitlist signup:', email)
}