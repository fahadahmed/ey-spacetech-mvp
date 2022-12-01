import React, { useState, useCallback } from 'react';
import shortid from 'shortid';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DropZone from './components/Dropzone';
import TrashDropZone from './components/TrashDropZone';
import SideBarItem from './components/SidebarItem';
import Row from './components/Row';
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from './utils/helpers';
import initialData from './utils/initial-data';
import {
  SIDEBAR_ITEMS,
  SIDEBAR_ITEM,
  COMPONENT,
  COLUMN,
} from './utils/constants';
import styles from './Canvas.styles.css';

export function canvasLinks() {
  return [{ rel: 'stylesheet', href: styles }];
}

const body = {
  display: 'grid',
  gridTemplateColumns: '4fr 8fr'
}

const sideBar = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
  gap: '1rem',
  minWidth: '40%'
}

const pageContainer = {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  marginBottom: '100px'
}

const page = {
  flex: '1 1 auto',
  margin: '20px'
}

function Canvas() {
  // TODO: how to get this layout from REST call - should we have some pre-defined layout
  const initialLayout = initialData.layout;
  // TODO: how do we get the initial set of components to populate
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone: any, item: any) => {
      const splitItemPath = item.path.split('-');
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone: any, item: any) => {
      console.log(layout);
      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      const newItem = { id: item.id, type: item.type, children: item.children };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-');
      const pathToItem = splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row: any, currentPath: any) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={body}>
        <div style={sideBar}>
          {Object.values(SIDEBAR_ITEMS).map((sideBarItem: any, index: number) => (
            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
          ))}
        </div>
        <div >
          <div style={page}>
            {layout.map((row, index) => {
              const currentPath = `${index}`;

              return (
                <React.Fragment key={row.id}>
                  <DropZone
                    data={{
                      path: currentPath,
                      childrenCount: layout.length,
                    }}
                    onDrop={handleDrop}
                    path={currentPath}
                  />
                  {renderRow(row, currentPath)}
                </React.Fragment>
              );
            })}
            <DropZone
              data={{
                path: `${layout.length}`,
                childrenCount: layout.length,
              }}
              onDrop={handleDrop}
              isLast
              className=""
            />
          </div>

          <TrashDropZone
            data={{
              layout,
            }}
            onDrop={handleDropToTrashBin}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default Canvas;