## Critical Remote Command Injection Uncovered in Western Digital My Cloud Devices

A severe vulnerability, identified as CVE-2023-46823, has been disclosed affecting numerous Western Digital (WD) My Cloud Network Attached Storage (NAS) devices. This critical flaw allows for unauthenticated remote command injection, granting an attacker complete control over the compromised device.

Discovered by security researchers at Rapid7, the vulnerability resides within the `/cgi-bin/sugarcrm/sugarcrm.log` endpoint. The design flaw permits an attacker to manipulate the `file` parameter via an HTTP GET request. Crucially, this endpoint lacks proper authentication checks, enabling an unauthenticated adversary to inject arbitrary commands that are then executed with root privileges on the underlying operating system.

The impact of successful exploitation is profound. An attacker can achieve arbitrary code execution, leading to complete device compromise. This includes unauthorized access to stored data, installation of malicious payloads, device bricking, or even leveraging the compromised NAS as a pivot point for further attacks within the network perimeter. The vulnerability has been assigned a CVSS v3.1 score of 9.8, categorizing it as critical.

Affected My Cloud devices encompass a broad range of models operating on My Cloud OS 5 and older OS 2.x/3.x firmware versions. Specifically, the following models are vulnerable:

*   My Cloud PR4100
*   My Cloud PR2100
*   My Cloud DL4100
*   My Cloud DL2100
*   My Cloud EX4100
*   My Cloud EX2100
*   My Cloud EX4 Plus
*   My Cloud EX2 Ultra
*   My Cloud Mirror Gen2

Western Digital has released firmware updates to address CVE-2023-46823. Users with devices running My Cloud OS 5 are advised to update to version 5.27.162. For devices still on older OS 2.x or OS 3.x firmware, the recommended update path is to upgrade to My Cloud OS 5 and then apply the 5.27.162 patch. WD has also provided a firmware update (2.31.204) for legacy OS 2.x/3.x devices that cannot transition to OS 5.

This incident marks another instance of critical vulnerabilities discovered in WD My Cloud series, underscoring the importance of diligent patching and network segmentation for NAS devices. Administrators and individual users are strongly urged to apply the relevant firmware updates immediately to mitigate the risk of remote compromise. Failure to patch these devices leaves them exposed to trivial, unauthenticated attacks capable of rendering them entirely hostile.