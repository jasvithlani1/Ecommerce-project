import { redirect } from 'next/navigation';

export default function AccountPage() {
    // Redirect the old account page to our new profile dashboard 
    // which handles mock orders locally without hitting WooCommerce APIs.
    redirect('/profile');
}
