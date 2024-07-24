<script lang="ts">
	import type { NavItem } from '$components/interfaces';

	export let navBrand: NavItem = { href: "/", displayText: "" };
	export let navItems: NavItem[] = [];
</script>

<header>
    <div class="container">
        <nav class="navbar">
            <a class="navbar-brand" href="{navBrand.href}">{navBrand.displayText}</a>
            <ul class="nav nav-pills">
                {#each navItems as navItem}
                <li class="nav-item">
                    <a class="nav-link" href="{navItem.href}">{navItem.displayText}</a>
                </li>
                {/each}
            </ul>
        </nav>
    </div>
</header>

<style>
    header {
      background-color: #0c3042;
    }
    a {
        color: white
    }
</style>
