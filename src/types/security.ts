export type SecurityPosture = "secure" | "elevated" | "containment" | "breach";

export interface CredentialStatus {
  id: string;
  name: string;
  type:
    | "api_key"
    | "jwt_secret"
    | "oauth_token"
    | "ssh_key"
    | "encryption_key"
    | "personal_access_token"
    | "tls_certificate"
    | "network_key";
  service: string;
  status: "valid" | "expiring_soon" | "revoked";
  lastRotated: string;
  scope: string;
}

export interface SecurityAuditLog {
  id: string;
  eventType: string;
  sourceIp: string;
  timestamp: string;
  severity: "info" | "warning" | "alert";
  details: string;
}

export interface SecurityStatusData {
  posture: SecurityPosture;
  firewallActive: boolean;
  mfaEnforced: boolean;
  activeCredentials: number;
  credentialsExpiringSoon: number;
  credentials: CredentialStatus[];
  recentAudits: SecurityAuditLog[];
}
