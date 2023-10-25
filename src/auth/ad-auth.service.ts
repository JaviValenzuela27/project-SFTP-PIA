import { Injectable } from '@nestjs/common';
import * as ActiveDirectory from 'activedirectory';

@Injectable()
export class AdAuthService {
  private ad: ActiveDirectory;

  constructor() {
    this.ad = new ActiveDirectory({
      url: 'LDAP://HNHOSTINGSERVICE.COM/',
      // url: 'LDAP://HNHOSTINGSERVICE.COM/',
      baseDN: 'DC=HNHOSTINGSERVICE,DC=COM',
      username: 'ldapxpl',
      password: 'P1lm3r0la#4901',
    });
  }

  async authenticateUser(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ad.authenticate(username, password, (err, auth) => {
        if (err) {
          reject(err);
        } else {
          resolve(auth);
        }
      });
    });
  }
}
