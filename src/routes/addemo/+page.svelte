<script lang="ts">
	import type { NavItem } from "$lib/components/interfaces";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";

    const navBrand: NavItem = { href: "/addemo", displayText: "Vernon Village Admin Portal"}
    
    export let data;
</script>

<div class="container">
    <SiteHeader navBrand={navBrand}/>
    <br>
    <div class="container">
        <h2>Welcome to the Vernon Village Admin Portal</h2>
        <hr>
        <p>Please log in to continue</p>
    
        {#if data.authenticated}
            <script>
                window.location.href = '/addemo/main';
            </script>
        {:else}
            <form method="POST" action="?/authenticate">
                <div>
                    <label for="email" class="form-label">Email</label>
                    <input type="text" name="email" class="form-control" />
                </div>
                <div>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" />
                </div>
                <br/>
                <input type="submit" class="btn btn-primary" value="Login">
            </form>
        {/if}
    </div>
    <br>
    <SiteFooter/>
</div>

