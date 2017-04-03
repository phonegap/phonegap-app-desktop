[Setup]
AppPublisher=Adobe Inc.
AppPublisherURL=https://www.adobe.com/
AppName=PhoneGap Desktop
AppId=com.adobe.phonegap.desktop
AppVersion=0.4.4
DefaultDirName={pf}\Adobe\PhoneGap\PhoneGap Desktop
DefaultGroupName=Adobe\PhoneGap
UninstallDisplayIcon={app}\PhoneGap.exe
Compression=lzma2
SolidCompression=yes
OutputDir="..\..\..\installers\win32"
LicenseFile=license.txt
OutputBaseFilename=PhoneGapSetup-win32

[Files]
Source: "..\..\..\build\PhoneGap-win32-ia32\PhoneGap.exe"; DestDir: "{app}"
Source: "..\..\..\build\PhoneGap-win32-ia32\*.pak"; DestDir: "{app}"
Source: "..\..\..\build\PhoneGap-win32-ia32\*.dll"; DestDir: "{app}"
Source: "..\..\..\build\PhoneGap-win32-ia32\*.dat"; DestDir: "{app}"
Source: "..\..\..\build\PhoneGap-win32-ia32\*.bin"; DestDir: "{app}"
Source: "..\..\..\build\PhoneGap-win32-ia32\resources\*"; DestDir: "{app}\resources"; Flags: recursesubdirs
Source: "..\..\..\build\PhoneGap-win32-ia32\locales\*.*"; DestDir: "{app}\locales"
Source: "..\..\..\build\PhoneGap-win32-ia32\LICENSE"; DestDir: "{app}"
Source: "..\..\..\build\PhoneGap-win32-ia32\version"; DestDir: "{app}"

[Icons]
Name: "{group}\Adobe\PhoneGap\PhoneGap Desktop"; Filename: "{app}\PhoneGap.exe"

[Run]
Filename: "{app}\resources\app.asar.unpacked\bin\node.exe"; Parameters: """{app}\resources\app.asar.unpacked\bin\downloadPG.js"""; StatusMsg: "Installing PhoneGap CLI..."; Flags: runhidden

[UninstallDelete]
Type: files; Name: "{app}\*"
Type: filesandordirs; Name: "{app}"
Type: filesandordirs; Name: "C:\ProgramData\Adobe\PhoneGap"

[Code]
// Utility functions for Inno Setup
//   used to add/remove programs from the windows firewall rules
// Code originally from http://news.jrsoftware.org/news/innosetup/msg43799.html

const
  NET_FW_SCOPE_ALL = 0;
  NET_FW_IP_VERSION_ANY = 2;

procedure SetFirewallException(AppName,FileName:string);
var
  FirewallObject: Variant;
  FirewallManager: Variant;
  FirewallProfile: Variant;
begin
  try
    FirewallObject := CreateOleObject('HNetCfg.FwAuthorizedApplication');
    FirewallObject.ProcessImageFileName := FileName;
    FirewallObject.Name := AppName;
    FirewallObject.Scope := NET_FW_SCOPE_ALL;
    FirewallObject.IpVersion := NET_FW_IP_VERSION_ANY;
    FirewallObject.Enabled := True;
    FirewallManager := CreateOleObject('HNetCfg.FwMgr');
    FirewallProfile := FirewallManager.LocalPolicy.CurrentProfile;
    FirewallProfile.AuthorizedApplications.Add(FirewallObject);
  except
  end;
end;

procedure RemoveFirewallException( FileName:string );
var
  FirewallManager: Variant;
  FirewallProfile: Variant;
begin
  try
    FirewallManager := CreateOleObject('HNetCfg.FwMgr');
    FirewallProfile := FirewallManager.LocalPolicy.CurrentProfile;
    FireWallProfile.AuthorizedApplications.Remove(FileName);
  except
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep=ssPostInstall then
     SetFirewallException('My Server', ExpandConstant('{app}')+'\TCPServer.exe');
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep=usPostUninstall then
     RemoveFirewallException(ExpandConstant('{app}')+'\TCPServer.exe');
end;
