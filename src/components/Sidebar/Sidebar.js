/**
 * Copyright (c) [2015-2019] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import React from 'react';
import Button from '../Button';

import './Sidebar.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <Button className="red">·</Button>
      <Button>·</Button>
      <Button>·</Button>
    </div>
  );
}

export default Sidebar;