import type { SPHERE_TYPES } from './types';
import { CONFIG } from "./config";

const isMobile = window.screen.availWidth < 800;

const distorted = 'true';

// Skin styles

const skinsXml = (sphereType?: SPHERE_TYPES): string => {
    const isCube = sphereType === 'CUBE';

    const mobileSpotSize = isCube ? '0.42' : '0.21';
    const screenSpotSize = isCube ? '0.26' : '0.10';

    const skinHotspotstyle = `
    <style name='skin_hotspotstyle_default'
      scale='${isMobile ? mobileSpotSize : screenSpotSize}' 
      edge='center' 
      distorted='${distorted}'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      onclick='skin_hotspotstyle_click(); fireEvent(get(linkedscene), click:hotspot);'
      onloaded='loadstyle(tooltip); loadstyle(skin_hotspotstyle_default);'
    />
  
    <action name='skin_hotspotstyle_click'>
      if(linkedscene,
        if(linkedscene_lookat,
          txtsplit(linkedscene_lookat, ',', hs_lookat_h, hs_lookat_v, hs_lookat_fov);
          );
        set(enabled, false);
        skin_hidetooltips();
        tween(depth|alpha|oy|rx, 4000|0.0|-50|-60, 0.5, default,
          skin_loadscene(get(linkedscene), get(skin_settings.loadscene_blend));
          if(hs_lookat_h !== null,
            skin_lookat(get(hs_lookat_h), get(hs_lookat_v), get(hs_lookat_fov));
            delete(hs_lookat_h, hs_lookat_v, hs_lookat_fov);
            );
          skin_updatescroll();
          );
        );
    </action>
  
    <!-- the 'tooltip' style - show the tooltip textfield and update its position as long as hovering -->
    <style name='tooltip'
      onover='tween(alpha,1.0);copy(layer[skin_tooltip].html, tooltip);
      set(layer[skin_tooltip].visible, true);
      tween(layer[skin_tooltip].alpha, 1.0, 0.5);
      asyncloop(hovering, copy(layer[skin_tooltip].x,mouse.stagex); copy(layer[skin_tooltip].y,mouse.stagey); );'
      onout='tween(alpha,1.0); tween(layer[skin_tooltip].alpha, 0.0, 0.25, default, set(layer[skin_tooltip].visible,false), copy(layer[skin_tooltip].x,mouse.stagex); copy(layer[skin_tooltip].y,mouse.stagey); );'
    />
  
    <!-- the 'tooltip' textfield -->
    <layer name='skin_tooltip' keep='true'
      url='${CONFIG.krpanoUrl}/plugins/textfield.swf'
      parent='STAGE'
      visible='false' alpha='0'
      enabled='false'
      align='righttop'
      edge='bottom'
      oy='-2'
      background='false' backgroundcolor='0xFFFFFF' backgroundalpha='1.0'
      border='false' bordercolor='0x000000' borderalpha='1.0'
      borderwidth='1.0' roundedge='0'
      shadow='0.0' shadowrange='4.0' shadowangle='45' shadowcolor='0x000000' shadowalpha='1.0'
      textshadow='1' textshadowrange='6.0' textshadowangle='90' textshadowcolor='0x000000' textshadowalpha='1.0'
      css='text-align:center; color:#FFFFFF; font-family:Arial; font-weight:bold; font-size:14px;'
      html=''
    />
  `;

    const skinDrag = `
    <style name='skin_drag' 
    edge='center' 
    distorted='${distorted}'
    border='true'
    bordercolor='0x000000'
    borderalpha='1.0'
    borderwidth='1.0'
    roundedge='1'
    alpha='1.0'
    width='140'
    height='140'
    onclick='if(keycode == 16, skin_hotspotstyle_click(), fireEvent(get(linkedscene), click:hotspot));'
    onloaded='loadstyle(tooltip); loadstyle(skin_drag);'
    dragging='
      if(pressed AND draggable,
        sub(dx,mouse.stagex,drag_adjustx);
        sub(dy,mouse.stagey,drag_adjusty);
        screentosphere(dx,dy,ath,atv);
        if(onDrag!==null, onDrag() );
        delayedcall(0, dragging(); );
        if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:hotspot) );,
        if(onDragEnd!==null, onDragEnd() );
      );'
    ondown='
      spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
      sub(drag_adjustx,mouse.stagex,hotspotcenterx);
      sub(drag_adjusty,mouse.stagey,hotspotcentery);
      if(onDragStart!==null, onDragStart() );
      if(draggable, dragging());'
    onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:hotspot) );'
    />
  `;

    const skinDragActive = `
    <style name='skin_drag_active' 
      edge='center' 
      distorted='${distorted}'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      onclick='if(get(draggable), fireEvent(get(linkedscene), click:hotspot), skin_hotspotstyle_click(); fireEvent(click:hotspot));'
      onloaded='loadstyle(tooltip); loadstyle(skin_drag_active);'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:hotspot) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:hotspot) );'
    />
  `;

    const skinInfoSpot = `
    <style name='skin_infospot' 
      edge='center'
      distorted='true' 
      rx='0.0' 
      ry='0.0' 
      z='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      onclick='fireEvent(e, click:infospot);'
      onloaded='loadstyle(tooltip); loadstyle(skin_infospot);'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:infospot) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:infospot) );'
    />
  `;

    const skinInfoSpotActive = `
    <style name='skin_infospot_active' 
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:infospot) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:infospot) );'
      onloaded='loadstyle(tooltip); loadstyle(skin_infospot_active);'
    />
  
    <action name='skin_hidetooltips'>
      set(layer[skin_tooltip].alpha,0.0);
      set(layer[skin_tooltip].visible,false);
    </action>
  
    <action name='skin_loadscene'>
      if(webvr.isenabled AND scene.count GT 1,
        set(hotspot[webvr_prev_scene].visible, false);
        set(hotspot[webvr_next_scene].visible, false);
      );
  
      txtadd(layer[skin_thumbborder].parent, 'skin_thumb_', get(scene[%1].index));
      layer[skin_thumbs].scrolltocenter(get(scene[%1].thumbx), get(scene[%1].thumby));
      loadscene(get(scene[%1].name), null, get(skin_settings.loadscene_flags), %2);
    </action>
  
    <action name='skin_updatescroll'>
      if(layer[skin_thumbs].loaded,
        set(cursceneindex, 0);
        if(xml.scene, copy(cursceneindex, scene[get(xml.scene)].index));
        layer[skin_thumbs].setcenter(get(scene[get(cursceneindex)].thumbx), get(scene[get(cursceneindex)].thumby));
      );
    </action>
  `;

    const skinLinkSpot = `
    <style name='skin_linkspot' 
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      novrspot='yes'
      onclick='fireEvent(e, click:linkspot);  skin_hotspotstyle_click();'
      onloaded='
        loadstyle(tooltip);
        loadstyle(skin_linkspot);
        if(webvr.isenabled == true, set(visible, false););
        if(webvr.isenabled == false, set(visible, true););'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:linkspot) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:linkspot) );'
    />
  `;

    const skinLinkSpotActive = `
    <style name='skin_linkspot_active' 
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:linkspot) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:linkspot) );'
      onloaded='
        loadstyle(tooltip);
        loadstyle(skin_linkspot_active);'
    />
  `;

    const skinProductSpot = `
    <style name='skin_product' 
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      novrspot='yes'
      onclick='fireEvent(e, click:product);  skin_hotspotstyle_click();'
      onloaded='
        loadstyle(tooltip);
        loadstyle(skin_product);
        if(webvr.isenabled == true, set(visible, false););
        if(webvr.isenabled == false, set(visible, true););'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:product) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:product) );'
    />
  `;

    const skinProductSpotActive = `
    <style name='skin_product_active' 
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      width='140'
      height='140'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:product) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:product) );'
      onloaded='
        loadstyle(tooltip);
        loadstyle(skin_product_active);'
    />
  `;

    const skinFlatImageSpot = `
    <style name='skin_flatspot' 
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      novrspot='yes'
      onclick='fireEvent(e, click:flatspot); skin_hotspotstyle_click();'
      onloaded='
        loadstyle(tooltip);
        loadstyle(skin_flatspot);
        if(webvr.isenabled == true, set(visible, false););
        if(webvr.isenabled == false, set(visible, true););'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:product) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:flatspot) );'
    />
  `;

    const skinFlatImageSpotActive = `
    <style name='skin_flatspot_active'
      edge='center'
      distorted='${distorted}' 
      rx='0.0' 
      ry='0.0' 
      rz='0.0'
      border='true'
      bordercolor='0x000000'
      borderalpha='1.0'
      borderwidth='1.0'
      roundedge='1'
      alpha='1.0'
      dragging='
        if(pressed AND draggable,
          sub(dx,mouse.stagex,drag_adjustx);
          sub(dy,mouse.stagey,drag_adjusty);
          screentosphere(dx,dy,ath,atv);
          if(onDrag!==null, onDrag() );
          delayedcall(0, dragging(); );
          if(mouse.x !== mouse.downx OR mouse.y !== mouse.downy, fireEvent(e, drag:flat) );,
          if(onDragEnd!==null, onDragEnd() );
        );'
      ondown='
        spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery);
        sub(drag_adjustx,mouse.stagex,hotspotcenterx);
        sub(drag_adjusty,mouse.stagey,hotspotcentery);
        if(onDragStart!==null, onDragStart() );
        if(draggable, dragging());'
      onup='if(draggable AND (mouse.x !== mouse.downx OR mouse.y !== mouse.downy), fireEvent(e, drop:flatspot) );'
      onloaded='
        loadstyle(tooltip);
        loadstyle(skin_flatspot_active);'
    />
  `;

    const contextMenu = `
    <contextmenu customstyle="">
      <item name="kr" caption="KRPANO"     />
      <item name="fs" caption="FULLSCREEN" />
      <item name="cc" caption="Change Controlmode" onclick="skin_changecontrolmode();"  separator="true" />
      <item name="nv" caption="Normal View"        onclick="skin_view_normal();"        showif="view.vlookatrange == 180" separator="true"      />
      <item name="fv" caption="Fisheye View"       onclick="skin_view_fisheye();"       showif="view.vlookatrange == 180" devices="flash|webgl" />
      <item name="sv" caption="Stereographic View" onclick="skin_view_stereographic();" showif="view.vlookatrange == 180" devices="flash|webgl" />
      <item name="av" caption="Architectural View" onclick="skin_view_architectural();" showif="view.vlookatrange == 180"                       />
      <item name="pv" caption="Pannini View"       onclick="skin_view_pannini();"       showif="view.vlookatrange == 180" devices="flash|webgl" />
      <item name="lp" caption="Little Planet View" onclick="skin_view_littleplanet();"  showif="view.vlookatrange == 180" devices="flash|webgl" />
    </contextmenu>
  
    <action name="skin_changecontrolmode">
      switch(control.mouse, moveto, drag);
      switch(control.touch, moveto, drag);
    </action>
  
    <action name="skin_view_look_straight">
      if(view.vlookat LT -80 OR view.vlookat GT +80,
        tween(view.vlookat, 0.0, 1.0, easeInOutSine);
        tween(view.fov,     100*Math.random(), distance(150,0.8));
        );
    </action>
  
    <action name="skin_view_normal">
      skin_view_look_straight();
      tween(view.architectural, 0.0, distance(1.0,0.5));
      tween(view.pannini,       0.0, distance(1.0,0.5));
      tween(view.distortion,    0.0, distance(1.0,0.5));
    </action>
  
    <action name="skin_view_fisheye">
      skin_view_look_straight();
      tween(view.architectural, 0.0,  distance(1.0,0.5));
      tween(view.pannini,       0.0,  distance(1.0,0.5));
      tween(view.distortion,    0.35, distance(1.0,0.5));
    </action>
  
    <action name="skin_view_architectural">
      skin_view_look_straight();
      tween(view.architectural, 1.0, distance(1.0,0.5));
      tween(view.pannini,       0.0, distance(1.0,0.5));
      tween(view.distortion,    0.0, distance(1.0,0.5));
    </action>
  
    <action name="skin_view_stereographic">
      skin_view_look_straight();
      tween(view.architectural, 0.0, distance(1.0,0.5));
      tween(view.pannini,       0.0, distance(1.0,0.5));
      tween(view.distortion,    1.0, distance(1.0,0.8));
    </action>
  
    <action name="skin_view_pannini">
      skin_view_look_straight();
      tween(view.architectural, 0.0, distance(1.0,0.5));
      tween(view.pannini,       1.0, distance(1.0,0.8));
      if(view.distortion LT 0.1,
        tween(view.distortion, 1.0, distance(1.0,0.8));
        );
    </action>
  
    <action name="skin_view_littleplanet">
      tween(view.vlookat, 90);
      tween(view.fov, 150, distance(150));
      tween(view.fovmax, 150); 
      tween(view.architectural, 0.0, distance(1.0,0.5));
      tween(view.pannini,       0.0, distance(1.0,0.5));
      tween(view.distortion,    1.0, distance(1.0,0.8));
      add(new_hlookat, view.hlookat, 123.0);
      tween(view.hlookat, get(new_hlookat), distance(100,0.8));
    </action>`;

    const customActions = `
    <!-- Action to remove bottom bar from vtourskin.xml -->
  
    <action name="skin_hidebottombar">
      set('layer[skin_splitter_bottom].visible', false); // remove background 
      set('layer[skin_scroll_layer].visible', false); // remove upper blue stripe 
      set('layer[skin_control_bar].visible', false); // remove controls 
      set('layer[skin_control_bar_bg].visible', false);
      set('layer[skin_control_bar_buttons].visible', false); 
    </action>
  
    <!-- Autorotate settings for premium view -->
    
    <autorotate
      waittime="3.0"
      speed="-3.0"
      horizon="0.0"
      tofov="120.0"
    />
  `;

    const eventBus = `
    <action name="fireEvent" type="Javascript">
      <![CDATA[
        var eventName = arguments[1][2];
        var event = document.createEvent("Event");
        event.initEvent(eventName, true, true);
        if (eventName == "scene:start") {
          event.scene = arguments[1][1];
        } else if (eventName != "idle:sphere") {
          event.scene = arguments[2].name;
        }
        document.dispatchEvent(event);
      ]]>
    </action>
  `;

    return `
    ${skinHotspotstyle}
    ${skinDrag}
    ${skinDragActive}
    ${skinInfoSpot}
    ${skinInfoSpotActive}
    ${skinLinkSpot}
    ${skinLinkSpotActive}
    ${customActions}
    ${contextMenu}
    ${eventBus}
    ${skinProductSpot}
    ${skinProductSpotActive}
    ${skinFlatImageSpot}
    ${skinFlatImageSpotActive}
  `;
};

export default skinsXml;
