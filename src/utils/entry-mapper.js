// TODO: remove this func after SDK release with bucket info on file item
export default (bucket) => (entry) => ({
  bucket,
  uuid: entry.uuid,
  path: entry.path,
  name: entry.name,
  isDir: entry.isDir,
  created: entry.created,
  updated: entry.updated,
  ipfsHash: entry.ipfsHash,
  sizeInBytes: entry.sizeInBytes,
  backupCount: entry.backupCount,
  fileExtension: entry.fileExtension,
  isLocallyAvailable: entry.isLocallyAvailable,
  members: entry.members.map((member) => ({
    address: member.address,
    publicKey: member.publicKey,
  })),
});
