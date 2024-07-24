<script lang="ts">
	import type { NavItem } from "$lib/components/interfaces";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";

 
    const navBrand: NavItem = { href: "/addemo/main", displayText: "Vernon Village Admin Portal"}
    const navItems: NavItem[] = [
        { href: "/addemo/add", displayText: "Add Content"},
        { href: "/addemo/approve", displayText: "Approve Content"},
        { href: "/addemo/messages", displayText: "Read Messages"},
        { href: "/addemo/edit", displayText: "Edit Content"},
        { href: "/addemo?/logout", displayText: "Logout"}
    ]
</script>

<div class="container">
    <SiteHeader navBrand={navBrand} navItems={navItems} />
    <br>
    <slot></slot>
    <br>
    <SiteFooter/>
</div>