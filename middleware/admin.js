export default function ({ $auth, redirect }) {
    if ($auth?.user?.group_id !== 1) {
        return redirect('/designs');
    }
}
