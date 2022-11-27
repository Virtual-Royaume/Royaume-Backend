import { LoggerService } from "@nestjs/common";
import { ConsoleEffect, ConsoleForground } from "./console-style";

export class Logger implements LoggerService {

  private formatLog(iconColor: ConsoleForground, icon: string, type: string, message: string): string {
    const maxSpace = 8;
    const spaceSize = maxSpace - type.length;

    const prefix = `${iconColor}${icon} ${ConsoleEffect.Bold}${ConsoleForground.White}${type}`;
    const separator = `${ConsoleEffect.Reset}${" ".repeat(spaceSize)}${ConsoleForground.Gray}» `;
    const content = `${ConsoleEffect.Reset}${message}`;

    return `${prefix}${separator}${content}`;
  }

  public log(message: string): void {
    console.log(this.formatLog(ConsoleForground.Blue, "-", "Info", message));
  }

  public error(message: string): void {
    console.log(this.formatLog(ConsoleForground.Red, "x", "Error", message));
  }

  public warn(message: string): void {
    console.log(this.formatLog(ConsoleForground.Yellow, "!", "Warn", message));
  }

  public debug(message: string): void {
    console.log(this.formatLog(ConsoleForground.Cyan, "o", "Debug", message));
  }

  public verbose(message: string): void {
    console.log(this.formatLog(ConsoleForground.Magenta, "~", "Verbose", message));
  }
}