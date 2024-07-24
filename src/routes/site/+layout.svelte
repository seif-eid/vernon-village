<script lang="ts">
	import type { NavItem } from "$lib/components/interfaces";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";

 
    const navBrand: NavItem = { href: "/site", displayText: "Vernon Village"}
    const navItems: NavItem[] = [
        { href: "/site/communitygroups", displayText: "Community Groups"},
        { href: "/site/upcomingevents", displayText: "Upcoming Events"},
        { href: "/site/homebusiness", displayText: "Local Businesses"},
        { href: "/site/sponsorship", displayText: "Sponsors"},
        { href: "/site/bulletin", displayText: "Bulletin Board"},
        { href: "/site/submit", displayText: "Submit Content!"},
        { href: "/site/contactus", displayText: "Contact Us"},
    ]
</script>
<style>
  
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }
  
    .content {
      flex: 1;
      padding: 20px; /* Adjust padding as needed */
    }
  </style>

<div class="container">
    <SiteHeader navBrand={navBrand} navItems={navItems} />
    <div class="content">
        <slot></slot>
      </div>  
    <hr>
    <SiteFooter />
</div>