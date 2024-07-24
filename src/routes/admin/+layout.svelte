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
</script>

<div class="container">
    <SiteHeader navBrand={navBrand} navItems={navItems} />
    <br>
    <slot></slot>
    <hr>
    <SiteFooter />
</div>