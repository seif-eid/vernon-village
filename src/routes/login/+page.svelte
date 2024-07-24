<script lang="ts">
	import type { NavItem } from "$lib/components/interfaces";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";

 
    const navBrand: NavItem = { href: "/admin", displayText: "Vernon Village Admin Portal"}
    const navItems: NavItem[] = [
        { href: "/admin/add", displayText: "Add Content"},
        { href: "/admin/approve", displayText: "Approve Content"},
        { href: "/admin/messages", displayText: "Read Messages"},
        { href: "/admin/read", displayText: "Edit Content"}
    ]

    export let data;
</script>
<svelte:head>
    <title>Login</title>
</svelte:head>
<style>
    /* CSS for the background image */
 

    .container {
        font-family: Arial, sans-serif;
        height: 100vh; /* Full viewport height */
        
        color:red;
        background-image: url('/src/routes/1711573841275.jpg'); /* Update with your image path */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    h1, h2 {
        color: #a60b0b;
        text-align: center;
        margin-bottom: 1rem;
    }

    p {
        color: rgb(121, 13, 13)a0a;
        text-align: justify;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .form-label {
        margin-bottom: 0.5rem;
    }

    .form-control {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease-in-out;
    }

    .btn-secondary {
        background-color: #6c757d;
    }

    .btn-primary:hover {
        background-color: #0056b3;
    }
</style>

<div class="container">
    <SiteHeader navBrand={navBrand} navItems={navItems} />
    <br>

    {#if data.authenticated}
        <h1>Welcome to the admin portal</h1>
        <br/>
        <form method="POST" action="?/logout">
            <button class="btn btn-secondary" type="submit">Log Out</button>
        </form>
    {:else}
        <div class="container">
            <h2>Welcome to the Vernon Village Admin Portal</h2>
            <hr>
            <p>Please log in to continue</p>
            <form method="POST" action="?/authenticate">
                <div>
                    <label for="email" class="form-label">Email</label>
                    <input type="text" name="email" class="form-control" />
                </div>
                <div>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" />
                </div>
                <br />
                <button class="btn btn-primary" type="submit">Sign In</button>
            </form>
        </div>
    {/if}

    <hr>
    <SiteFooter />
</div>