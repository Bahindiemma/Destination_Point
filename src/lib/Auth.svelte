
<script>

    //import firebase from 'firebase/app';
    import auth_state from "../../static/auth_state.js";
    import google_auth from "../../static/google_auth.js";    // persist user state

</script>


{#if $auth_state.isLoggedIn}
    Hello { $auth_state.user.name }
    <button on:click={google_auth.logout} type="button">Sign out</button>
{:else}
    <button on:click={google_auth.login} type="button">Google sign in</button>
{/if}
<button on:click={google_auth.logout} type="button">Sign out</button>