/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Asset {

  
    @Property()
    public ID: string;

    @Property()
    public Owner: string;

    @Property()
    public Name: string;

    @Property()
    public Type: string;
    
    @Property()
    public Link: string;
}
