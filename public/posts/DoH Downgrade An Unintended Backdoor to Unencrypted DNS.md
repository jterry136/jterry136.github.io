## DoH Downgrade: An Unintended Backdoor to Unencrypted DNS

DNS-over-HTTPS (DoH) emerged as a critical protocol designed to enhance privacy and security for DNS queries, encapsulating traditional DNS traffic within encrypted HTTPS sessions. The intent is to mitigate man-in-the-middle (MITM) attacks, prevent surveillance of DNS activity, and counter DNS-based censorship. However, recent analysis, as highlighted by CERT VU#534320, reveals a significant vulnerability in many DoH implementations that undermines these very objectives: the DoH downgrade attack.

The core of this vulnerability lies not within the DoH protocol specification itself, but in the "fail-open" behavior exhibited by numerous DoH clients. When a DoH client, whether it's a browser, operating system component, or network appliance, encounters a failure in establishing or maintaining a DoH connection—for instance, if the DoH server is unreachable or unresponsive—it frequently falls back silently to unencrypted DNS over UDP or TCP port 53.

An on-path adversary can exploit this behavior by strategically blocking DoH traffic. This can involve actively dropping packets destined for common DoH endpoints (e.g., TCP/UDP port 443 to specific DoH provider IP addresses) or performing more sophisticated traffic manipulation. Upon detecting the DoH connection failure, the client's insecure implementation transparently shifts to resolving DNS queries via traditional, unencrypted mechanisms. This effectively nullifies the security and privacy benefits of DoH, creating an opportunistic window for the attacker.

The impact of a successful DoH downgrade is substantial. Once a client is forced onto unencrypted DNS, the adversary can:

1.  **Observe DNS Queries:** Monitor all DNS lookups performed by the victim, revealing browsing history, application usage, and other sensitive information.
2.  **Spoof DNS Responses:** Inject malicious or manipulated DNS records, redirecting users to phishing sites, malware distribution platforms, or attacker-controlled infrastructure. This can lead to credential theft, drive-by downloads, or compromised communications.
3.  **Perform Cache Poisoning:** Exploit vulnerabilities in intermediate DNS resolvers to store false records, extending the reach of their spoofing attacks.

This vulnerability underscores a critical design flaw in how secure protocols are often integrated. The principle of "fail-secure" dictates that in the event of a cryptographic or secure channel failure, the operation should cease or alert the user, rather than reverting to an insecure mode. The observed "fail-open" behavior directly contravenes this principle.

**Mitigation Strategies:**

Addressing this issue requires a multi-faceted approach involving both vendor responsibility and user/administrator vigilance.

**For Vendors and Developers:**

*   **Implement Secure Failure:** DoH clients must be engineered to fail securely. If a DoH connection cannot be established or maintained, DNS resolution should either fail outright, requiring explicit user intervention, or alert the user about the security degradation. Automatic, silent fallback to unencrypted DNS is unacceptable.
*   **Provide Explicit Configuration:** Offer clear and robust configuration options that allow users or administrators to mandate DoH usage and explicitly disable any insecure fallback mechanisms.

**For Users and Network Administrators:**

*   **Disable Insecure Fallback:** Where client software provides the option, explicitly disable fallback to unencrypted DNS.
*   **Network-Level Enforcement:** For managed environments, implement firewall rules to block outgoing unencrypted DNS traffic (UDP/TCP port 53) for hosts expected to use DoH. This forces DoH clients to fail if their secure channel is compromised, preventing the downgrade.
*   **Leverage DNSSEC (with caveats):** While DNSSEC does not prevent observation of unencrypted DNS queries, it can help detect DNS spoofing and tampering *after* a downgrade has occurred, provided the entire DNS resolution chain and the client validate DNSSEC signatures. Its effectiveness is contingent on widespread adoption and proper implementation.
*   **Utilize VPNs:** A properly configured Virtual Private Network (VPN) encrypts all network traffic, including DNS queries, before it leaves the client's device. This makes DoH downgrade attacks significantly more difficult, assuming the VPN tunnel is established prior to any vulnerable DNS resolution.

The DoH downgrade vulnerability serves as a stark reminder that the security of a protocol is only as strong as its implementation. For DoH to truly fulfill its promise of enhanced privacy and security, developers must prioritize "fail-secure" designs, and users must be empowered with the controls to enforce secure DNS resolution.