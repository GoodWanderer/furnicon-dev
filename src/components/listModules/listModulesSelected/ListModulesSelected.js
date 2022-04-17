import { useSelector, useDispatch } from 'react-redux';
import { setModulesSelectedUp, setModulesSelectedDown, setCurrentModuleSelected } from '../../../actions';

import { v4 as uuidv4 } from 'uuid';

const ListModulesSelected = () => {
  const { modulesSelectedUp, modulesSelectedDown, currentModuleSelected } = useSelector(state => state);
  const dispatch = useDispatch();

  const onAddModulesSelectedUp = () => {
    const id = uuidv4();
    const item = {
      id, 
      type: 'up',
      depth: 'full', 
      mounted: 'x2',
      modeles: {
        up1: {},
        up2: {},
        up3: {}
      }
    }
    dispatch(setModulesSelectedUp([
      ...modulesSelectedUp, item
    ]));
    dispatch(setCurrentModuleSelected(item));
  }

  const onAddModulesSelectedDown = () => {
    const id = uuidv4();
    const item = {
      id, 
      type: 'down',
      modeles: {
        down: {},
      }
    }
    dispatch(setModulesSelectedDown([
      ...modulesSelectedDown, item
    ]));
    dispatch(setCurrentModuleSelected(item));
  }

  const onSetCurrentModuleSelected = (item) => {
    dispatch(setCurrentModuleSelected(item));
  }

  const renderSelectedUpItems = (items) => {
    return items.map(item => {
      const up2View = item.modeles.up2 !== false ? <Up2 item={item}/> : null;
      const up1View = item.modeles.up1 !== false ? <Up1 width={up2View} item={item}/> : null;
      const upRowView = up1View || up2View ? <div className='configuration-layout-plan-selected__up'>{up1View}{up2View}</div> : null;
      const up3View = item.modeles.up3 !== false ? <Up3 width={up1View} item={item}/> : null;
      return (
        <div 
          key={item.id} 
          onClick={() => onSetCurrentModuleSelected(item)}
          className={`configuration-layout-plan-selected__item ${item.id === currentModuleSelected?.id ? 'active':''}`}>
          {upRowView}
          {up3View}
        </div>
      )
    });
  }

  const renderSelectedDownItems = (items) => {
    return items.map(item => {
      const down3View = item.modeles.down !== false ? <Down item={item}/> : null;
      return (
        <div 
          key={item.id} 
          onClick={() => onSetCurrentModuleSelected(item)}
          className={`configuration-layout-plan-selected__item ${item.id === currentModuleSelected?.id ? 'active':''}`}>
          {down3View}
        </div>
      )
    });
  }

  const selectedItemsUp = renderSelectedUpItems(modulesSelectedUp);
  const selectedItemsDown = renderSelectedDownItems(modulesSelectedDown);

  return (
    <>
      <div 
        style={{padding: '40px 0 0'}}
        className="configuration-layout-plan__selected configuration-layout-plan-selected">
        {selectedItemsUp}
        <div
          onClick={() => onAddModulesSelectedUp()} 
          className="configuration-layout-plan-selected__item add">
          <div className={`configuration-layout-plan-selected__text`}>
            +
          </div>
        </div>
      </div>
      <div className="configuration-layout-plan__selected configuration-layout-plan-selected">
        {selectedItemsDown}
        <div
          onClick={() => onAddModulesSelectedDown()} 
          className="configuration-layout-plan-selected__item add">
          <div className={`configuration-layout-plan-selected__text`}>
            +
          </div>
        </div>
      </div>
    </>
  );
};

const Up1 = ({width, item}) => {
  let img = item?.modeles?.up1?.img;
  return (
    <div
      style={{
        flex: width?'0 0 calc(50% - 2.5px)':'0 0 100%',
        border: img?'none':'',
        background: img?`url(${img}) 0 0/100% 100% no-repeat`:''
      }} 
      className={`configuration-layout-plan-selected__up-1`}>
    </div>
  )
}
const Up2 = ({item}) => {
  let img = item?.modeles?.up2?.img;
  return (
    <div 
    style={{
      border: img?'none':'',
      background: img?`url(${img}) 0 0/100% 100% no-repeat`:''
    }} 
    className={`configuration-layout-plan-selected__up-2`}>
    </div>
  )
}
const Up3 = ({width, item}) => {
  let img = item?.modeles?.up3?.img;
  return (
    <div
      style={{
        height: !width?'100%':'60%',
        margin: !width?'0':'5px 0 0',
        border: img?'none':'',
        background: img?`url(${img}) 0 0/100% 100% no-repeat`:''
      }} 
      className={`configuration-layout-plan-selected__down`}>
    </div>
  )
}
const Down = ({item}) => {
  let img = item?.modeles?.down?.img;
  return (
    <div
      style={{
        height: '100%',
        margin: '0',
        border: img?'none':'',
        background: img?`url(${img}) 0 0/100% 100% no-repeat`:''
      }} 
      className={`configuration-layout-plan-selected__down`}>
    </div>
  )
}

export default ListModulesSelected;