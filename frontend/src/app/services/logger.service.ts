import { Injectable } from '@angular/core';

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logLevel: LogLevel = LogLevel.INFO;

  constructor() {
    // Set log level based on environment
    // In production, you might want to set this to WARN or ERROR only
    const isProduction = false; // TODO: Set based on environment
    this.logLevel = isProduction ? LogLevel.WARN : LogLevel.DEBUG;
  }

  /**
   * Log debug message
   */
  debug(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${this.getTimestamp()} - ${message}`, ...args);
    }
  }

  /**
   * Log info message
   */
  info(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[INFO] ${this.getTimestamp()} - ${message}`, ...args);
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${this.getTimestamp()} - ${message}`, ...args);
    }
  }

  /**
   * Log error message
   */
  error(message: string, error?: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${this.getTimestamp()} - ${message}`, error, ...args);
    }
  }

  /**
   * Get timestamp for logs
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }
}
