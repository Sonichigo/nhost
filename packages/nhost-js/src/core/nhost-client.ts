import { HasuraAuthClient, NhostAuthConstructorParams } from '@nhost/hasura-auth-js'
import { HasuraStorageClient } from '@nhost/hasura-storage-js'

import { NhostFunctionsClient } from '../clients/functions'
import { NhostGraphqlClient } from '../clients/graphql'

export interface NhostClientConstructorParams extends Omit<NhostAuthConstructorParams, 'url'> {
  /**
   * Nhost backend URL.
   */
  backendUrl: string
}

export class NhostClient {
  auth: HasuraAuthClient
  storage: HasuraStorageClient
  functions: NhostFunctionsClient
  graphql: NhostGraphqlClient

  /**
   * Nhost Client
   *
   * @example
   * const nhost = new NhostClient({ url });
   *
   * @docs https://docs.nhost.io/reference/javascript
   */
  constructor({
    backendUrl,
    refreshIntervalTime,
    clientStorageGetter,
    clientStorageSetter,
    clientStorage,
    clientStorageType,
    autoRefreshToken,
    autoSignIn,
    start = true
  }: NhostClientConstructorParams) {
    if (!backendUrl) throw new Error('Please specify a `backendUrl`. Docs: [todo]!')
    this.auth = new HasuraAuthClient({
      url: `${backendUrl}/v1/auth`,
      refreshIntervalTime,
      clientStorageGetter,
      clientStorageSetter,
      clientStorage,
      clientStorageType,
      autoRefreshToken,
      autoSignIn,
      start
    })

    this.storage = new HasuraStorageClient({
      url: `${backendUrl}/v1/storage`
    })

    this.functions = new NhostFunctionsClient({
      url: `${backendUrl}/v1/functions`
    })

    this.graphql = new NhostGraphqlClient({
      url: `${backendUrl}/v1/graphql`
    })

    // * Set current token if token is already accessable
    this.storage.setAccessToken(this.auth.getAccessToken())
    this.functions.setAccessToken(this.auth.getAccessToken())
    this.graphql.setAccessToken(this.auth.getAccessToken())

    this.auth.client?.onStart(() => {
      // * Set access token when signing out
      this.auth.onAuthStateChanged((_event, session) => {
        if (_event === 'SIGNED_OUT') {
          this.storage.setAccessToken(undefined)
          this.functions.setAccessToken(undefined)
          this.graphql.setAccessToken(undefined)
        }
      })

      // * Update access token for clients, including when signin in
      this.auth.onTokenChanged((session) => {
        this.storage.setAccessToken(session?.accessToken)
        this.functions.setAccessToken(session?.accessToken)
        this.graphql.setAccessToken(session?.accessToken)
      })
    })
  }
}
