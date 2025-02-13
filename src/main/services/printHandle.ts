import { BrowserWindow, ipcMain, WebContentsPrintOptions } from 'electron'
import config from '@config/index'
import { otherWindowConfig } from "../config/windowsConfig"
import { printURL } from '@main/config/StaticPath'

export function usePrintHandle() {
  ipcMain.handle('getPrinters', async event => {
    // return await event.sender.getPrintersAsync()
    return event.sender.getPrinters()
  })

  ipcMain.handle('printHandlePrint', async (event, options: WebContentsPrintOptions) => {
    return new Promise(resolve => {
      event.sender.getPrinters
      event.sender.print(options, (success: boolean, failureReason: string) => {
        resolve({ success, failureReason })
      })
    })
  })

  ipcMain.handle('openPrintDemoWindow', () => {
    openPrintDemoWindow()
  })

  ipcMain.handle
}

let win: BrowserWindow
export function openPrintDemoWindow() {
  if (win) {
    win.show()
    return
  }
  win = new BrowserWindow({
    titleBarStyle: config.IsUseSysTitle ? 'default' : 'hidden',
      ...Object.assign(otherWindowConfig, {})
  })
  win.loadURL(printURL)
  win.on('ready-to-show', () => {
    win.show()
  })
}